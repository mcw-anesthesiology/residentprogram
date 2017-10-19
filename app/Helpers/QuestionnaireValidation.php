<?php

namespace App\Helpers;

class QuestionnaireValidation {
	static function questionnaireIsValid($questionnaire) {
		foreach ($questionnaire['sections'] as $section) {
			if (!self::sectionIsValid($section))
				return false;
		}

		return true;
	}

	static function sectionIsValid($section) {
		foreach ($section['items'] as $item) {
			if ($item['type'] != 'instruction') {
				if (!self::questionIsValid($item))
					return false;
			}
		}

		return true;
	}

	static function questionIsValid($question) {
		if ($question['type'] != 'list' && empty($question['required'])) {
			return true;
		}

		switch ($question['type']) {
			case 'text':
				if (empty($question['value'])) {
					return false;
				}
				break;
			case 'number':
				if (!key_exists('value', $question)) {
					return false;
				}
				if (!empty($question['min']) && $question['value'] < $question['min']) {
					return false;
				}
				if (!empty($question['max']) && $question['value'] > $question['max']) {
					return false;
				}
				break;
			case 'checkbox':
			case 'radio':
				$optionChecked = false;
				foreach ($question['options'] as $option) {
					if (!empty($option['checked'])) {
						$optionChecked = true;
					}
				}
				if (!$optionChecked) {
					return false;
				}
				break;
			case 'list':
				return self::listQuestionIsValid($question);
		}

		return true;
	}

	static function listQuestionIsValid($list) {
		if (!key_exists('items', $list) || empty($list['items'])) {
			return false;
		}

		foreach ($list['items'] as $listItem) {
			if (key_exists('itemProps', $list)) {
				foreach ($list['itemProps'] as $key => $value) {
					if ($listItem[$key] != $value) {
						return false;
					}
				}
			}

			if (!self::listItemIsValid($listItem)) {
				return false;
			}
		}

		return true;
	}

	static function listItemIsValid($listItem) {
		switch ($listItem['type']) {
			case 'text':
				if (empty($listItem['text'])) {
					return false;
				}
				break;
			case 'publication':
				if (empty($listItem['title']) || empty($listItem['role'])) {
					return false;
				}
				break;
			case 'committee':
				if (empty($listItem['name']) || empty($listItem['role'])) {
					return false;
				}
				break;
			case 'study':
				if (empty($listItem['title'])
					|| empty($listItem['role'])
					|| empty($listItem['yearInitiated'])
					|| empty($listItem['approvalNumber'])
					|| empty($listItem['progress'])
				) {
					return false;
				}
				break;
			case 'grant':
			case 'grantOther':
				if (empty($listItem['agency'])
					|| empty($listItem['project'])
					|| !key_exists('amount', $listItem)
				) {
					return false;
				}
				break;
			case 'certification':
				if (empty($listItem['board']) || empty($listItem['specialty'])) {
					return false;
				}
				break;
			case 'editorialBoard':
				if (empty($listItem['journal']) || empty($listItem['role'])) {
					return false;
				}
				break;
			case 'review':
				if (empty($listItem['work']) || empty($listItem['reviews'])) {
					return false;
				}
				break;
			case 'lecture':
			case 'audienceLecture':
				if (empty($listItem['title']) || empty($listItem['date']) || empty($listItem['audience'])) {
					return false;
				}
				break;
			case 'mentorship':
			case 'subjectMentorship':
				if (empty($listItem['mentee']) || empty($listItem['subject'])) {
					return false;
				}
				break;
		}

		return true;
	}
}
