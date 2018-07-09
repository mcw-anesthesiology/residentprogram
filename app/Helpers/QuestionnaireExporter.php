<?php

namespace App\Helpers;

use App\MeritReport;

class QuestionnaireExporter {
	static function exportReportsByForm($formProps, $startDate = null, $endDate = null) {
		$meritReports = MeritReport::with('user')
			->where('status', 'complete')
			->whereHas('form', function ($query) use ($formProps) {
				return $query->where($formProps);
			})
			->get()
			->sortBy('user.full_name')
			->values()
			->all();

		return self::meritReportsToArray($meritReports);
	}

	static function meritReportsToArray($meritReports) {
		// This is pretty memory-intensive because they need to be laid out vertically instead of horizontally.
		// Could maybe use generators instead?

		if (empty($meritReports))
			return [];

		$header = new QuestionnaireReportHeader($meritReports[0]->report);
		$sheet = self::addColumn([], $header->toArray());

		foreach ($meritReports as $report) {
			$col = new QuestionnaireReportColumn($report->report, $report->user->full_name);
			$sheet = self::addColumn($sheet, $col->toArray());
		}

		return $sheet;
	}

	static function addColumn($sheet, $column) {
		foreach ($column as $i => $cell) {
			if (empty($sheet[$i]))
				$sheet[$i] = [];

			$sheet[$i][] = $cell;
		}

		return $sheet;
	}
}

class ReportColumn {
	protected $column = [];
	protected $indentLevel = 0;

	protected function getIndent() {
		return implode('', array_fill(0, $this->indentLevel, "    "));
	}

	protected function addCell($val) {
		$this->column[] = $this->getIndent() . $val;
	}

	public function toArray() {
		return $this->column;
	}
}

class QuestionnaireReportHeader extends ReportColumn {

	public function __construct($report) {
		$this->column = ['Name'];
		$this->walkReport($report);
	}


	private function walkReport($report) {
		foreach ($report['pages'] as $page) {
			$this->walkSection($page);
		}
	}

	private function walkSection($section) {
		$this->addCell($section['title']);
		$this->indentLevel++;
		foreach ($section['items'] as $item) {
			switch ($item['type']) {
			case 'section':
				$this->walkSection($item);
				break;
			case 'item':
				$this->walkItem($item);
				break;
			}
		}
		$this->indentLevel--;
	}

	private function walkItem($item) {
		$this->addCell($item['text']);
		if (isset($item['questions'])) {
			$this->indentLevel++;
			foreach ($item['questions'] as $question) {
				$this->walkQuestion($question);
			}
			$this->indentLevel--;
		}
	}

	private function walkQuestion($question) {
		$this->addCell($question['text']);
	}
}

class QuestionnaireReportColumn extends ReportColumn {

	public function __construct($report, $name) {
		$this->column = [$name];
		$this->walkReport($report);
	}

	private function walkReport($report) {
		foreach ($report['pages'] as $page) {
			$this->walkSection($page);
		}
	}

	private function walkSection($section) {
		$this->addCell('');
		foreach ($section['items'] as $item) {
			switch ($item['type']) {
			case 'section':
				$this->walkSection($item);
				break;
			case 'item':
				$this->walkItem($item);
				break;
			}
		}
	}

	private function walkItem($item) {
		if (!empty($item['checked'])) {
			$this->addCell('X');
			if (isset($item['questions'])) {
				foreach ($item['questions'] as $question) {
					$this->walkQuestion($question);
				}
			}
		} else {
			$this->addCell('');
			if (isset($item['questions'])) {
				foreach ($item['questions'] as $question) {
					$this->addCell('');
				}
			}
		}
	}

	private function walkQuestion($question) {
		switch ($question['type']) {
		case 'text':
		case 'textarea':
		case 'number':
			$this->addCell($question['value']);
			break;
		case 'select':
			$this->addCell(implode(', ', array_map(
				function($option) {
					return $option['text'];
				},
				array_filter($question['options'], function ($option) {
					return !empty($option['selected']);
				})
			)));
			break;
		case 'radio':
		case 'checkbox':
			$this->addCell(implode(', ', array_map(
				function($option) {
					return $option['text'];
				},
				array_filter($question['options'], function ($option) {
					return !empty($option['checked']);
				})
			)));
			break;
		case 'list':
			$this->walkListQuestion($question);
			break;
		}
	}

	private function walkListQuestion($question) {
		if (empty($question['items'])) {
			$this->addCell('');
		} else {
			$this->addCell(implode("\n", array_map(
				function ($itemDisplay) {
					return '- ' . $itemDisplay;
				},
				array_map(function($item) use ($question) {
					switch ($question['listType']) {
					case 'text':
						return empty($item['text']) ? '' : $item['text'];
					default:
						return self::displayListItemObject($item);
					}
				}, $question['items'])
			)));
		}
	}

	private static function displayListItemObject($item, $keysToInclude = null) {
		if (!empty($keysToInclude))
			$item = array_filter($item, function ($key) use ($keysToInclude) {
				return in_array($key, $keysToInclude);
			}, ARRAY_FILTER_USE_KEY);

		return implode("\n", array_map(function ($display) {
			return "\t" . $display;
		}, array_map(function ($key, $val) {
			if ($key == 'type')
				$val = ucfirst(camelCaseToWords($val));

			return ucfirst(camelCaseToWords($key)) . ': ' . $val;
		}, array_keys($item), $item)));
	}
}


function camelCaseToWords($str) {
	$words = preg_split('/([[:upper:]][[:lower:]]+)/', $str, null, PREG_SPLIT_DELIM_CAPTURE | PREG_SPLIT_NO_EMPTY);
	if ($words === false)
		return $str;

	return implode(' ', array_map(function ($word) {
		return lcfirst($word);
	}, $words));
}
