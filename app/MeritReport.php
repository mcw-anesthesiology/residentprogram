<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Helpers\DateHelpers;

use App\Scopes\MeritReportScope;

use Log;

class MeritReport extends Model
{
	const LINK_PREFIXES = [
		'www.ncbi.nlm.nih.gov/pubmed/',
		'pmid:',
		'pmid',
		'pubmed:',
		'pubmed'
	];

	protected static function boot() {
		parent::boot();

		static::addGlobalScope(new MeritReportScope);
	}

    protected $table = 'merit_reports';

	protected $casts = [
		'id' => 'integer',
		'user_id' => 'integer',
		'form_id' => 'integer',
		'report' => 'array'
	];

	protected $fillable = [
		'user_id',
		'form_id',
		'period_start',
		'period_end',
		'report',
		'status'
	];

	protected $dates = [
		'period_start',
		'period_end',
		'created_at',
		'updated_at'
	];

	public function getReportAttribute($report) {
		if (empty($report)) {
			$report = $this->form->form;
		}

		return json_decode($report, true);
	}

	public function user() {
		return $this->belongsTo('App\User');
	}

	public function form() {
		return $this->belongsTo('App\MeritReportForm', 'form_id');
	}

	public function revisions() {
		return $this->hasMany('App\MeritReportRevision', 'merit_report_id');
	}

	public function getSlugAttribute() {
		return $this->form->report_slug;
	}

	public static function getCurrentYear() {
		return DateHelpers::getDateRangeFromPeriodType('year');
	}

	public function getPublicationsAttribute() {
		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
			case 'mcw-anesth-faculty-merit-2016-2017':

				$publications = [];
				$publicationsSection = $this->report['pages'][2]['items'][0];

				foreach ($publicationsSection['items'] as $publicationItem) {
					if (!empty($publicationItem['checked'])) {
						foreach ($publicationItem['questions'][0]['items'] as $pubItem) {
							$publications[] = array_merge([
								'publicationType' => $publicationItem['text']
							], $pubItem);
						}
					}
				}
				return $publications;
			default:
				throw new \UnexpectedValueException('Unrecognized report slug ' . $this->form->report_slug);
			}
		} catch (\Exception $e) {
			// FIXME: Should return some gql error
			Log::error('Error in getPublicationsAttribute ' . $e);
			return [];
		}
	}

	public function getPubMedIdsAttribute() {
		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
			case 'mcw-anesth-faculty-merit-2016-2017':
				return array_filter(array_map(function ($publication) {
					return self::publicationPmid($publication);
				}, $this->publications));
			default:
				throw new \UnexpectedValueException('Unrecognized report slug ' . $this->form->report_slug);
			}
		} catch (\Exception $e) {
			Log::error('Error in getPubMedIdsAttribute ' . $e);
			return null;
		}
	}

	public function getConferencePresentationsAttribute() {

		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
				$conferenceIndexes = [1, 2, 3, 4, 5];
				break;
			case 'mcw-anesth-faculty-merit-2016-2017':
				$conferenceIndexes = [0, 2, 3, 4, 5];
				break;
			default:
				throw new \UnexpectedValueException('Unrecognized report slug ' . $this->form->report_slug);
			}

			$conferencePresentations = 0;
			$educationOutsideMCWSection = $this->report['pages'][1]['items'][2];

			foreach ($conferenceIndexes as $i) {
				$conferenceSection = $educationOutsideMCWSection['items'][$i];
				if (!empty($conferenceSection['checked'])) {
					$conferencePresentations += count($conferenceSection['questions'][0]['items']);
				}
			}

			return $conferencePresentations;

		} catch (\Exception $e) {
			Log::error('Error in getConferencePresentationsAttribute ' . $e);
			return null;
		}
	}

	/*
	 * Number of other presentations given (grand rounds, invited professorships),
	 * materials developed (such as computer-based modules), or work presented
	 * in non-peer review publications in the previous academic year.
	 * Articles without PMIDs should be counted in this section.
	 * This will include publication which are peer reviewed but not recognized
	 * by the National Library of Medicine.
	 */
	public function getOtherPresentationsAttribute() {

		try {
			$otherPresentations = 0;
			$publicationsWithoutPmids = array_filter($this->publications, function ($publication) {
				return empty(self::publicationPmid($publication));
			});

			$otherPresentations += count($publicationsWithoutPmids);

			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
				$educationDepartmental = $this->report['pages'][1]['items'][0];
				$departmentalLecture = $educationDepartmental['items'][0];
				$otherPresentations += self::countListItems($departmentalLecture);

				$medStudentSection = $educationDepartmental['items'][1];
				foreach ([
					5, // Med student interest group
					6, // New med student lecture
					7 // Repeat " " lecture
				] as $i) {
					$otherPresentations += self::countListItems($medStudentSection['items'][$i]);
				}

				$residentFellowSection = $educationDepartmental['items'][2];
				foreach ([
					1, // New resident/fellow lecture
					2, // Repeat " lecture
				] as $i) {
					$otherPresentations += self::countListItems($residentFellowSection['items'][$i]);
				}

				$educationInsideMCWSection = $this->report['pages'][1]['items'][1];
				foreach ($educationInsideMCWSection['items'] as $presentationType) {
					$otherPresentations += self::countListItems($presentationType);
				}

				$educationOutsideMCWSection = $this->report['pages'][1]['items'][2];
				foreach ([
					0, // Visiting professor
					6 // Local community group
				] as $nonConferenceIndex) {
					$cs = $educationOutsideMCWSection['items'][$nonConferenceIndex];
					$otherPresentations += self::countListItems($cs);
				}
				break;
			case 'mcw-anesth-faculty-merit-2016-2017':
				$educationInsideMCWSection = $this->report['pages'][1]['items'][1];
				foreach ($educationInsideMCWSection['items'] as $presentationType) {
					$otherPresentations += self::countListItems($presentationType);
				}

				$educationOutsideMCWSection = $this->report['pages'][1]['items'][2];
				foreach ([
					1, // Visiting professor
					6 // Local community group
				] as $nonConferenceIndex) {
					$cs = $educationOutsideMCWSection['items'][$nonConferenceIndex];
					$otherPresentations += self::countListItems($cs);
				}
				break;
			default:
				throw new \UnexpectedValueException('Unrecognized report slug ' . $this->form->report_slug);
			}
		} catch (\Exception $e) {
			Log::error('Error in getOtherPresentationsAttribute ' . $e);
			return null;
		}

		return $otherPresentations;
	}

	static function getListItems($item) {
		if (!empty($item['checked'])) {
			return $item['questions'][0]['items'];
		}

		return [];
	}

	static function countListItems($item) {
		return count(self::getListItems($item));
	}

	/*
	 * Number of chapters or textbooks published in the previous academic year
	 */
	public function getChaptersTextbooksAttribute() {
		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
			case 'mcw-anesth-faculty-merit-2016-2017':
				$pubSection = $this->report['pages'][2]['items'][0];

				return self::countListItems($pubSection['items'][0]) // Book / Text, First Ed.
					+ self::countListItems($pubSection['items'][1]) // Book / Text, Revised Ed.
					+ self::countListItems($pubSection['items'][4]); // Book chapter
			default:
				throw new \UnexpectedValueException('Unrecognized report slug ' . $this->form->report_slug);
			}
		} catch (\Exception $e) {
			Log::error('Error in getChaptersTextbooksAttribute ' . $e);
			return null;
		}
	}

	public function getStudiesAttribute() {
		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
			case 'mcw-anesth-faculty-merit-2016-2017':
				return self::getListItems(
					$this->report['pages'][2]['items'][1]['items'][0]
				);
			default:
				throw new \UnexpectedValueException('Unrecognized report slug ' . $this->form->report_slug);
			}
		} catch (\Exception $e) {
			Log::error('Error in getStudiesAttribute ' . $e);
			return [];
		}

	}

	/*
	 * Number of grants for which faculty member had a leadership role
	 * (PI, Co-PI, or site director) in the previous academic year
	 */
	public function getGrantsAttribute() {
		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
			case 'mcw-anesth-faculty-merit-2016-2017':
				$grantSection = $this->report['pages'][2]['items'][1]['items'][1];
				return array_merge(
					[],
				   	array_map(function($grant) {
						$grant['type'] = 'EXISTING';
						return $grant;
					}, self::getListItems($grantSection['items'][0])),
					array_map(function($grant) {
						$grant['type'] = 'NEW';
						return $grant;
					}, self::getListItems($grantSection['items'][1]))
				);
			default:
				throw new \UnexpectedValueException('Unrecognized report slug ' . $this->form->report_slug);
			}
		} catch (\Exception $e) {
			Log::error('Error in getGrantsAttribute ' . $e);
			return [];
		}
	}

	public function getNumGrantsAttribute() {
		return count($this->grants);
	}

	public function getLeadershipRoleAttribute() {
		return $this->leadershipPositions > 0;
	}

	/*
	 * Had an active leadership role (such as serving on committees or
	 * governing boards) in national medical organizations or served as
	 * reviewer or editorial board member for a peer-reviewed journal in the
	 * previous academic year
	 */
	public function getLeadershipPositionsAttribute() {
		$positions = 0;
		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
				$isCommitteeChair = function ($question) {
					try {
						foreach ($question['items'] as $item) {
							if ($item['role'] === 'chair') {
								return true;
							}
						}
					} catch (\Exception $e) {
						Log::error('Error in isCommitteeChair', $question);
					}

					return false;
				};

				$specialtyOrgSection = $this->report['pages'][3]['items'][0];

				$roleListOrgIndexes = [
					0, // ASA
					1, // WSA
					2, // ABA
					3, // ABA - Critical care
					4 // SEA
				];
				foreach ($roleListOrgIndexes as $i) {
					$org = $specialtyOrgSection['items'][$i];
					if (
						!empty($org['checked'])
						&& (
							!empty($org['questions'][0]['items'])
							|| $isCommitteeChair($org['questions'][1])
						)
					) {
						$positions++;
					}
				}

				$radioIndexes = [
					5, // SCA
					6, // SPA
					7, // SOAP
					8, // MARC
					9, // SNACC
					10 // FAER
				];
				foreach ($radioIndexes as $i) {
					$org = $specialtyOrgSection['items'][$i];
					if (
						!empty($org['checked'])
						&& (
							count(array_filter($org['questions'][0]['options'], function ($option) {
								return !empty($option['checked']);
							})) > 0
							|| $isCommitteeChair($org['questions'][1])
						)
					) {
						$positions++;
					}
				}

				$items = $this->report['pages'][3]['items'][1]['items'];
				foreach ([
					1, // Ad-hoc article reviewer
					5 // Journal editorial board
				] as $i) {
					if (!empty($items[$i]['checked'])) {
						$positions++;
					}
				}

				break;
			case 'mcw-anesth-faculty-merit-2016-2017':
				$specialtyOrgSection = $this->report['pages'][3]['items'][0];

				$asa = $specialtyOrgSection['items'][0];
				if (!empty($asa['checked'])) {
					foreach ($asa['questions'][0]['options'] as $option) {
						if (
							!empty($option['checked'])
							&& array_search($option['value'], [
								'board-of-directors',
								'committee-chair',
								'committee-member'
							]) !== false
						) {
							$positions++;
						}
					}
				}

				$wsa = $specialtyOrgSection['items'][1];
				if (!empty($wsa['checked'])) {
					foreach ($wsa['questions'][0]['options'] as $option) {
						if (
							!empty($option['checked'])
							&& array_search($option['value'], [
								'board-of-directors',
								'officer',
								'committee-chair',
								'committee-member'
							]) !== false
						) {
							$positions++;
						}
					}
				}

				foreach ([
					3, // SEA
					4, // SCA
					5, // SOAP
					6, // Other
				] as $i) {
					if (!empty($specialtyOrgSeciton['items'][$i]['checked'])) {
						$positions++;
					}
				}

				$items = $this->report['pages'][3]['items'][1]['items'];
				foreach ([
					1, // Ad-hoc article reviewer
					9 // Journal editorial board
				] as $i) {
					if (!empty($items[$i]['checked'])) {
						$positions++;
					}
				}
				break;
			default:
				throw new \UnexpectedValueException('Unrecognized report slug ' . $this->form->report_slug);
			}

		} catch (\Exception $e) {
			Log::error('Error in getLeadershipRoleAttribute' . $e);
		}

		return $positions;
	}

	/*
	 *  In the previous academic year, held responsibility for seminars,
	 *  conference series, or course coordination (such as arrangement of
	 *  presentations and speakers, organization of materials, assessment of
	 *  participants' performance) for any didactic training within the
	 *  sponsoring institution or program. This includes training modules for
	 *  medical students, residents, fellows and other health professionals.
	 *  This does not include single presentations such as individual lectures
	 *  or conferences.
	 */
	public function getTeachingFormalCoursesAttribute() {
		return null;
	}

	public function getParticipatesInSimulationAttribute() {
		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
				return !empty($this->report['pages'][1]['items'][0]['items'][2]['items'][12]['checked']);
			case 'mcw-anesth-faculty-merit-2016-2017':
				return !empty($this->report['pages'][1]['items'][0]['items'][1]['items'][12]['checked']);
			default:
				throw new \UnexpectedValueException('Unrecognized report slug ' . $this->form->report_slug);
			}
		} catch (\Exception $e) {
			Log::error('Error in getParticipatesInSimulationAttribute' . $e);
			return null;
		}
	}

	public function getNationalBoardsAttribute() {
		$nationalBoards = [];

		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
			case 'mcw-anesth-faculty-merit-2016-2017':
				foreach ($this->report['pages'][3]['items'][0]['items'] as $orgItem) {
					if (!empty($orgItem['checked'])) {
						if ($orgItem['text'] !== 'Other') {
							$nationalBoards[] = [
								'name' => $orgItem['text'],
								'role' => self::getOrgRoles($orgItem['questions'][0])
							];
						}
					}
				}
				break;
			default:
				throw new \UnexpectedValueException('Unrecognized report slug ' . $this->form->report_slug);
			}
		} catch (\Exception $e) {
			Log::error('Error in getNationalBoardsAttribute ' . $e);
			return null;
		}

		return $nationalBoards;
	}

	static function getOrgRoles($question) {
		switch ($question['type']) {
		case 'list':
			return implode(', ', array_map(function ($item) {
				return $item['text'];
			}, $question['items']));
		case 'text':
			return $question['text'];
		case 'checkbox':
			return implode(', ', array_map(function ($option) {
				return $option['text'];
			}, array_filter($question['options'], function ($option) {
				return !empty($option['checked']);
			})));
			break;
		default:
			return 'Unknown';
		}
	}

	public static function publicationPmid($publication) {
		try {
			$link = strtolower($publication['link']);
			foreach (self::LINK_PREFIXES as $pmidPrefix) {
				if (strpos($link, $pmidPrefix) !== false) {
					$pmid = substr($link, strlen($pmidPrefix));
					if (is_numeric($pmid)) {
						return $pmid;
					}
				}
			}
		} catch (\Exception $e) {
			Log::error('Error in publicationPmid' . $e);
		}

		return null;
	}
}
