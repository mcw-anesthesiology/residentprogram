<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Helpers\DateHelpers;
use App\Helpers\DisplayHelpers;

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

	const MCW_ANESTH_2016_TO_2017_PUBLICATION_TYPE_MAP = [
		'Abstract and/or Poster (Professional Society meeting)' => 'Abstract / Poster (Professional Society meeting)',
		'Original Article: Prospective trial' => 'Original Article',
		'Book Chapter Author (new or revised)' => 'Book Chapter (new or revised)'
	];

	const MCW_ANESTH_2016_TO_2017_GRANT_AGENCY_MAP = [
		'VA Merit' => 'VA Merit Grant'
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

				foreach ($publications as &$publication) {
					if ($this->form->report_slug ==  'mcw-anesth-faculty-merit-2016-2017') {
						if (key_exists($publication['publicationType'], self::MCW_ANESTH_2016_TO_2017_PUBLICATION_TYPE_MAP)) {
							$publication['publicationType'] = self::MCW_ANESTH_2016_TO_2017_PUBLICATION_TYPE_MAP[$publication['publicationType']];
						}
					}

					$publication = self::trimProps($publication);
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

	static function getListItems($item, $index = 0) {
		try {
			if (self::isChecked($item)) {
				return $item['questions'][$index]['items'];
			}
		} catch (\Exception $e) {
			Log::error('Error in getListItems ' . $e);
		}

		return [];
	}

	static function getTextListItems($item, $index = 0) {
		return array_map(function($item) {
			return $item['text'];
		}, self::getListItems($item, $index));
	}

	static function getTextListOrCheckboxItems($item, $index = 0) {
		if (self::isChecked($item)) {
			$question = $item['questions'][$index];
			switch ($question['questionType']) {
			case 'list':
				return self::getTextListItems($item, $index);
				break;
			case 'checkbox':
				return array_map(
					function ($option) {
						return $option['text'];
					},
					array_filter($question['options'], function ($option) {
						return !empty($option['checked']);
					})
				);
			}
		}

		return [];
	}

	static function countListItems($item) {
		return count(self::getListItems($item));
	}

	static function isChecked($item) {
		return !empty($item['checked']);
	}

	static function getSelectedRadioOption($question) {
		foreach ($question['options'] as $option) {
			if (!empty($option['checked'])) {
				return $option;
			}
		}
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
				$grants = array_merge(
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

				foreach ($grants as &$grant) {
					if ($this->form->report_slug == 'mcw-anesth-faculty-merit-2016-2017') {
						if (key_exists($grant['agency'], self::MCW_ANESTH_2016_TO_2017_GRANT_AGENCY_MAP)) {
							$grant['agency'] = self::MCW_ANESTH_2016_TO_2017_GRANT_AGENCY_MAP[$grant['agency']];
						}
					}

					$grant = self::trimProps($grant);
				}

				return $grants;
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
		return $this->leadership_positions > 0;
	}

	public function getLeadershipPositionsAttribute() {
		$sum = 0;

		foreach ($this->leadership_roles as $v) {
			$sum += count($v['roles']);
		}

		return $sum;
	}

	/*
	 * Had an active leadership role (such as serving on committees or
	 * governing boards) in national medical organizations or served as
	 * reviewer or editorial board member for a peer-reviewed journal in the
	 * previous academic year
	 */
	public function getLeadershipRolesAttribute() {
		$EDUCATION = 0;
		$INTERNAL = 1;
		$REGIONAL = 2;
		$NATIONAL = 3;

		$roles = [
			[
				'roleType' =>  'Anesthesia education program',
				'roles' => $this->education_leadership_roles
			],
			[
				'roleType' => 'Internal',
				'roles' => $this->internal_leadership_roles
			],
			[
				'roleType' => 'Regional',
				'roles' => $this->regional_leadership_roles
			],
			[
				'roleType' => 'National & International',
				'roles' => $this->national_leadership_roles
			]
		];

		$committeesChaired = array_filter($this->committees, function ($c) {
			return $c['role'] == 'chair';
		});

		foreach ($committeesChaired	as $committee) {
			switch (self::getOrganizationType($committee)) {
			case 'INTERNAL':
				$roles[$INTERNAL]['roles'][] = self::getCommitteeRoleDisplay($committee);
				break;
			case 'REGIONAL':
				$roles[$REGIONAL]['roles'][] = self::getCommitteeRoleDisplay($committee);
				break;
			case 'NATIONAL':
				$roles[$NATIONAL]['roles'][] = self::getCommitteeRoleDisplay($committee);
				break;
			}
		}

		return $roles;
	}

	static function getCommitteeRoleDisplay($committee) {
		$result = $committee['name'];

		if (!preg_match('/commitee/i', $committee['name'])) {
			$result .= ' committee';
		}

		$result .= " {$committee['role']}";

		return $result;
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

	public function getDepartmentalCommitteesAttribute() {
		$committees = [];
		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
			case 'mcw-anesth-faculty-merit-2016-2017':

				$departmentalCommitteeItem = $this->report['pages'][3]['items'][2]['items'][3];

				if (self::isChecked($departmentalCommitteeItem)) {
					$committees = self::getListItems($departmentalCommitteeItem);
				}
				break;
			default:
				throw new \UnexpectedValueException('Unrecognized report slug ' . $this->form->report_slug);
			}
		} catch (\Exception $e) {
			Log::error('Error in getDepartmentalCommitteesAttribute ' . $e);
		}

		return array_map(function ($committee) {
			$committee['organizationType'] = 'INTERNAL';
			return $committee;
		}, $committees);
	}

	public function getInstitutionalCommitteesAttribute() {
		$committees = [];

		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
			case 'mcw-anesth-faculty-merit-2016-2017':
				$scholarlyServiceItems = $this->report['pages'][3]['items'][1]['items'];
				$HOSPIAL_SOM = 0;
				$INSTITUTIONAL = 4;

				foreach ([$HOSPIAL_SOM, $INSTITUTIONAL] as $i) {
					$item = $scholarlyServiceItems[$i];
					if (self::isChecked($item)) {
						$committees = array_merge(
							$committees,
							self::getListItems($item)
						);
					}
				}
				break;
			default:
				throw new \UnexpectedValueException('Unrecognized report slug ' . $this->form->report_slug);
			}
		} catch (\Exception $e) {
			Log::error('Error in getInstitutionalCommitteesAttribute ' . $e);
		}

		return array_map(function ($committee) {
			$committee['organizationType'] = 'INTERNAL';
			return $committee;
		}, $committees);
	}

	public function getInternalCommitteesAttribute() {
	    return array_merge(
		[],
		$this->departmental_committees,
		$this->institutional_committees
	    );
	}

	public function getInternalCommitteeParticipationAttribute() {
		$results = [];

		if (!empty($this->departmental_committees)) {
			$results[] = [
				'organization' => 'Departmental',
				'organizationType' => 'INTERNAL',
				'committees' => $this->departmental_committees
			];
		}

		if (!empty($this->institutional_committees)) {
			$results[] = [
				'organization' => 'Institutional',
				'organizationType' => 'INTERNAL',
				'committees' => $this->institutional_committees
			];
		}

		return $results;
	}

	public function getSpecialtyOrganizationCommitteeParticipationAttribute() {
		$results = [];
		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
			case 'mcw-anesth-faculty-merit-2016-2017':
				$orgItems = $this->report['pages'][3]['items'][0]['items'];


				foreach ($orgItems as $orgItem) {
					if (self::isChecked($orgItem)) {
						$committees = self::getListItems($orgItem, 1);
						if (!empty($committees)) {
							$organizationType = null;
							switch ($orgItem['text']) {
							case 'MARC':
							case 'WSA':
								$organizationType = 'REGIONAL';
								break;
							case 'Other':
								$organizationType = null;
								break;
							default:
								$organizationType = 'NATIONAL';
							}


							if (!empty($organizationType)) {
								$committees = array_map(function ($c) use ($organizationType) {
									if (empty($c['organizationType'])) {
										$c['organizationType'] = $organizationType;
									}
									return $c;
								}, $committees);
							}

							$results[] = [
								'organization' => $orgItem['text'],
								'organizationType' => $organizationType,
								'committees' => $committees
							];
						}
					}
				}


				break;
			default:
				throw new \UnexpectedValueException('Unrecognized report slug ' . $this->form->report_slug);
			}
		} catch (\Exception $e) {
			Log::error('Error in getNationalCommitteeParticipation ' . $e);
		}

		return $results;
	}

	public function getCommitteeParticipationAttribute() {
		return array_merge(
			[],
			$this->internal_committee_participation,
			$this->specialty_organization_committee_participation
		);
	}

	public function getCommitteesByTypeAttribute() {
		return collect($this->committees)->groupBy('organizationType');
	}

	public function getCommitteesAttribute() {
		return array_reduce(
			$this->committee_participation,
		   	function ($acc, $commOrg) {
				return array_merge($acc, $commOrg['committees']);
			},
			[]
		);
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

	public function getEditorialBoardsAttribute() {
		$editorialBoards = [];

		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
			case 'mcw-anesth-faculty-merit-2016-2017':
				$predefinedRoles = [
					'editor-in-chief',
					'associate-editor',
					'executive-editor',
					'statistical-editor'
				];

				$boards = self::getListItems($this->report['pages'][3]['items'][1]['items'][5]);

				foreach ($boards as &$board) {
					if (in_array($board['role'], $predefinedRoles)) {
						$board['role'] = DisplayHelpers::kebabCaseToWords($board['role']);
					}
				}

				return $boards;
			default:
				throw new \UnexpectedValueException('Unrecognized report slug ' . $this->form->report_slug);
			}
		} catch (\Exception $e) {
			Log::error('Error in getEditorialBoardsAttribute ' . $e);
			return null;
		}

		return $editorialBoards;
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
			if (!empty($publication['link'])) {
				$link = strtolower($publication['link']);
				foreach (self::LINK_PREFIXES as $pmidPrefix) {
					if (strpos($link, $pmidPrefix) !== false) {
						$pmid = substr($link, strlen($pmidPrefix));
						if (is_numeric($pmid)) {
							return $pmid;
						}
					}
				}
			} else {
				Log::debug('No link specified for publication', $publication);
			}
		} catch (\Exception $e) {
			Log::error('Error in publicationPmid' . $e);
		}

		return null;
	}

	public function getDirectorshipsAttribute() {
		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
			case 'mcw-anesth-faculty-merit-2016-2017':
				$items = $this->report['pages'][3]['items'][2]['items'];
				return [
					'clinicalService' => self::getTextListItems($items[0]),
					'simulationCenter' => self::getTextListItems($items[1]),
					'visitingRotators' => self::getTextListItems($items[2]),
				];
			default:
				throw new \UnexpectedValueException('Unrecognized report slug ' . $this->form->report_slug);
			}
		} catch (\Exception $e) {
			Log::error('Error in getEditorialBoardsAttribute ' . $e);
			return null;
		}
	}

	public function getInterviewsAttribute() {
		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
			case 'mcw-anesth-faculty-merit-2016-2017':
				return self::getListItems($this->report['pages'][3]['items'][2]['items'][4]);
			default:
				throw new \UnexpectedValueException('Unrecognized report slug ' . $this->form->report_slug);
			}
		} catch (\Exception $e) {
			Log::error('Error in getEditorialBoardsAttribute ' . $e);
			return null;
		}
	}

	public function getLecturesAttribute() {
		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
				// TODO
				$report = $this->report;
				$items = [
					$report['pages'][1]['items'][0]['items'][0],
					$report['pages'][1]['items'][0]['items'][1]['items'][5],
					$report['pages'][1]['items'][0]['items'][1]['items'][6],
					$report['pages'][1]['items'][0]['items'][1]['items'][7],
					$report['pages'][1]['items'][0]['items'][2]['items'][1],
					$report['pages'][1]['items'][0]['items'][2]['items'][2],
					$report['pages'][1]['items'][1]['items'][0],
					$report['pages'][1]['items'][1]['items'][1],
					$report['pages'][1]['items'][2]['items'][0],
					$report['pages'][1]['items'][2]['items'][1],
					$report['pages'][1]['items'][2]['items'][2],
					$report['pages'][1]['items'][2]['items'][3],
					$report['pages'][1]['items'][2]['items'][4],
					$report['pages'][1]['items'][2]['items'][5],
					$report['pages'][1]['items'][2]['items'][6]
				];
				return call_user_func_array('array_merge', array_map(function($item) {
					return array_map(function($lectureItem) use ($item) {
						return array_merge($lectureItem, [
							'lectureType' => $item['text']
						]);
				   	}, self::getListItems($item));
				}, $items));
			case 'mcw-anesth-faculty-merit-2016-2017':
				// TODO
			default:
				throw new \UnexpectedValueException('Unrecognized report slug ' . $this->form->report_slug);
			}
		} catch (\Exception $e) {
			Log::error('Error in getLecturesAttribute ' . $e);
			return [];
		}
	}

	public function getEducationLeadershipRolesAttribute() {
		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
				$roles = [];

				$educationSection = $this->report['pages'][1]['items'][0];

				$internItems = $educationSection['items'][1]['items'];

				$CLERKSHIP = 0;
				$COURSE_DIRECTOR = 1;

				foreach ([$CLERKSHIP, $COURSE_DIRECTOR] as $i) {
					if (self::isChecked($internItems[$i])) {
						$roles[] = $internItems[$i]['text'];
					}
				}

				$residentFellowItems = $educationSection['items'][2]['items'];

				$JOURNAL_CLUB = 0;
				$INTERN = 4;
				$RESIDENCY = 5;
				$FELLOWSHIP = 6;
				$ASSOCIATE = 7;

				foreach ([$JOURNAL_CLUB, $INTERN, $RESIDENCY] as $i) {
					if (self::isChecked($residentFellowItems[$i])) {
						$roles[] = $residentFellowItems[$i]['text'];
					}
				}

				if (self::isChecked($residentFellowItems[$FELLOWSHIP])) {
					$fellowship = self::getSelectedRadioOption($residentFellowItems[$FELLOWSHIP]['questions'][0]);
					if (!empty($fellowship)) {
						$roles[] = "{$fellowship['text']} Fellowship Program Director";
					}
				}

				if (self::isChecked($residentFellowItems[$ASSOCIATE])) {
					$program = self::getSelectedRadioOption($residentFellowItems[$ASSOCIATE]['questions'][0]);
					if (!empty($program)) {
						$roles[] = "Associate Program Director - {$program['text']}";
					}
				}

				$otherItems = $educationSection['items'][3]['items'];
				$MSA_INSTRUCTOR = 3;

				if (self::isChecked($otherItems[$MSA_INSTRUCTOR])) {
					$roles[] = $otherItems[$MSA_INSTRUCTOR]['text'];
				}

				return $roles;
			default:
				throw new \UnexpectedValueException('Unrecognized report slug: ' . $this->form->report_slug);
			}
		} catch (\Exception $e) {
			Log::error('Error in getEducationLeadershipRolesAttribute ' . $e);
		}

		return [];
	}

	public function getInternalLeadershipRolesAttribute() {
		$roles = [];
		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
				// Clinical / Administrative service

				$clinicalAdminServiceItems = $this->report['pages'][3]['items'][2]['items'];
				$DIRECTOR_CLINICAL_SERVICE = 0;
				$DIRECTOR_SIM_CENTER = 1;
				$DIRECTOR_VISITING_ROTATORS = 2;

				foreach ([$DIRECTOR_CLINICAL_SERVICE, $DIRECTOR_SIM_CENTER, $DIRECTOR_VISITING_ROTATORS] as $i) {
					if (self::isChecked($clinicalAdminServiceItems[$i])) {
						$roles[] = $clinicalAdminServiceItems[$i]['text'];
					}
				}

				foreach ($this->internal_committees as $committee) {
					if ($committee['role'] == 'chair') {
						$roles[] = "Committee chair - {$committee['name']}";
					}
				}

				$qiItems = $this->report['pages'][4]['items'][2]['items'];
				$LEAD_HOSPITAL_TEAM = 2;
				$LEAD_DEPARTMENT_TEAM = 3;

				if (self::isChecked($qiItems[$LEAD_HOSPITAL_TEAM]) || self::isChecked($qiItems[$LEAD_DEPARTMENT_TEAM])) {
					$roles[] = 'QI project team leader';
				}
				break;
			}
		} catch (\Exception $e) {
			Log::error('Error in getInternalLeadershipRolesAttribute: ' . $e);
		}

		return $roles;
	}

	public function getBoardLeadershipRolesAttribute() {
		$roles = [];
		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
				$orgItems = $this->report['pages'][3]['items'][0]['items'];
				foreach ($orgItems as $orgItem) {
					if (self::isChecked($orgItem)) {
						$orgRoles = self::getOrgRoles($orgItem['questions'][0]);

						$roles = array_merge(
							$roles,
							array_map(function ($itemRole) use ($orgItem) {
								return "{$orgItem['text']} {$itemRole}";
							}, $orgRoles)
						);
					}
				}
				break;
			}
		} catch (\Exception $e) {
			Log::error('Error in getRegionalLeadershipRolesAttribute: ' . $e);
		}

		return $roles;
	}

	static function getOrganizationType($committee) {
		if (!empty($committee['organizationType'])) {
			return $committee['organizationType'];
		}

		return self::guessOrganizationType($committee['name']);
	}

	static function getPattern($pieces) {
		$subpatterns = implode('|', array_map(function ($piece) {
			return "({$piece})";
		}, $pieces));

		return "/{$subpatterns}/i";
	}

	static function guessOrganizationType($name) {
		if ($name == 'Other') {
			return null;
		}

		$INTERNAL = [
			'MCW',
			'CHW',
			'VA'
		];
		$REGIONAL = [
			'MARC',
			'WSA',
			'Western Trauma Association',
			'Wisconsin'
		];
		$NATIONAL = [
			'National',
			'International',
			'SAMBA',
			'IARS',
			'AAPM',
			'AUA',
			'APS',
			'American Pain Society',
			'SPA',
			'SNACC',
			'Society for Brain Connectivity',
			'SEA',
			'Society for the Advancement of Transplant'
		];


		if (preg_match(self::getPattern($INTERNAL), $name)) {
			return 'INTERNAL';
		}
		if (preg_match(self::getPattern($REGIONAL), $name)) {
			return 'REGIONAL';
		}
		if (preg_match(self::getPattern($NATIONAL), $name)) {
			return 'NATIONAL';
		}

		return null;
	}

	public function getRegionalLeadershipRolesAttribute() {
	    // TODO
	    return [];
	}

	public function getNationalLeadershipRolesAttribute() {
		$roles = [];

		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
				$scholarlyServiceSection = $this->report['pages'][3]['items'][1];
				$items = [
					$scholarlyServiceSection['items'][2],
					$scholarlyServiceSection['items'][3],
					$scholarlyServiceSection['items'][5],
				];

				foreach ($items as $item) {
					if (self::isChecked($item)) {
						$roles[] = $item['text'];
					}
				}
			}
		} catch (\Exception $e) {
			Log::error('Error in getNationalLeadershipRolesAttribute: ' . $e);
		}

		return $roles;
	}

	public function getCertificationsAttribute() {
		$certifications = [];

		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
				$items = $this->report['pages'][4]['items'][0]['items'];

				for ($i = 0; $i <= 9; $i++) {
					if (self::isChecked($items[$i])) {
						$certifications[] = $items[$i]['questions'][0]['items'][0];
					}
				}

				// Other
				if (self::isChecked($items[10])) {
					$certifications = array_merge(
						$certifications,
						$items[10]['questions'][0]['items']
					);
				}

				break;
			default:
				throw new \UnexpectedValueException('Unrecognized report slug: ' . $this->form->report_slug);
			}
		} catch (\Exception $e) {
			Log::error('Error in getCertificationsAttribute ' . $e);
		}

		return $certifications;
	}

	public function getOrganizationsAttribute() {
		$organizations = [];

		try {
			switch ($this->form->report_slug) {
			case 'mcw-anesth-faculty-merit-2017-2018':
				$orgItems = $this->report['pages'][3]['items'][0]['items'];

				foreach ($orgItems as $item) {
					if (self::isChecked($item)) {
						if ($item['text'] == 'Other') {
							$organizations = array_merge(
								$organizations,
								array_map(
									function ($listItem) {
										return $listItem['text'];
									},
									self::getListItems($item)
								)
							);
						} else {
							$organizations[] = $item['text'];
						}
					}
				}

				break;
			default:
				throw new \UnexpectedValueException('Unrecognized report slug: ' . $this->form->report_slug);
			}
		} catch (\Exception $e) {
			Log::error('Error in getOrganizationsAttribute ' . $e);
		}

		return $organizations;
	}

	static function trimProps(&$obj) {
		foreach ($obj as &$prop) {
			$prop = trim($prop);
		}

		return $obj;
	}
}
