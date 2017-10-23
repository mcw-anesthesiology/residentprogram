<?php

// This has to manually be kept in sync with client-side implementation
// in resources/assets/js/modules/questionnaire/validate.js

// TODO: A lot of these could use some tests.

namespace App\Helpers;

class QuestionnaireValidation {
	static function isQuestion($item) {
		return array_key_exists('type', $item) && in_array($item['type'], [
			'text',
			'number',
			'select',
			'checkbox',
			'radio',
			'list'
		]);
	}

	static function getQuestions($questionnaire) {
		$questions = [];

		$isQuestion = function($question) {
			return self::isQuestion($question);
		};

		foreach ($questionnaire['sections'] as $section) {
			$questions = array_merge($questions, array_filter($section['items'], $isQuestion));
		}

		return $questions;
	}

	static function getQuestionsIdMap($questions) {
		$map = [];

		foreach ($questions as $question) {
			if (
				array_key_exists('id', $question)
				&& !array_key_exists($question['id'], $map)
			)
				$map[$question['id']] = $question;
		}

		return $map;
	}

	static function getConditionChecker($questions) {
		$questionIdMap = self::getQuestionsIdMap($questions);

		return function($condition) use ($questionIdMap) {
			return array_key_exists($condition['questionId'], $questionIdMap)
				&& self::questionMatchesValue(
					$questionIdMap[$condition['questionId']],
					$condition['questionValue']
				);
		};
	}

	static function questionMatchesValue($question, $value) {
		switch ($question['type']) {
			case 'text':
				if (!empty($question['value']) && (
					(is_bool($value) && $value)
					|| (is_string($value) && $value === $question['value'])
					|| (is_array($value) && in_array($question['value'], $value))
				))
					return true;
				break;
			case 'number':
				if (!empty($question['value']) && (
					(is_bool($value) && $value)
					|| (is_numeric($value) && $value === $question['value'])
					|| (is_array($value) && in_array($question['value'], $value))
				))
					return true;
				break;
			case 'select':
				$selectValue = self::getSelectValue($question);
				if (!empty($selectValue) && (
					(is_bool($value) && $value)
					|| (
						(is_string($value) || is_numeric($value))
						&& $value === $selectValue
					)
					|| (is_array($value) && in_array($selectValue, $value))
				))
					return true;
				break;
			case 'checkbox':
			case 'radio':
				$values = self::getRadioCheckboxValues($question);
				if (!empty($values) && (
					(is_bool($value) && $value)
					|| (
						(is_string($value) || is_numeric($value))
						&& in_array($value, $values)
					)
					|| (is_array($value) && !empty(array_intersect($values, $value)))
				))
					return true;
				break;
			case 'list':
				if (is_bool($value) && $value && !empty($question['items']))
					return true;
				break;
		}

		return false;
	}

	static function getSelectValue($question) {
		foreach ($question['options'] as $option) {
			if ($option['selected'])
				return $option['value'];
		}

		return null;
	}

	static function getRadioCheckboxValues($question) {
		$values = [];

		foreach ($question['options'] as $option) {
			if ($option['checked'])
				$values[] = $option['value'];
		}

		return $values;
	}

	static function questionnaireIsValid($questionnaire) {

		$meetsCondition = self::getConditionChecker(self::getQuestions($questionnaire));

		foreach ($questionnaire['sections'] as $section) {
			if (
				array_key_exists('condition', $section)
				&& $meetsCondition($section['condition'])
				&& !self::sectionIsValid($section)
			)
				return false;
		}

		return true;
	}

	static function sectionIsValid($section, $meetsCondition = null) {
		if (is_null($meetsCondition)) {
			$isQuestion = function($question) {
				return self::isQuestion($question);
			};

			$meetsCondition = self::getConditionChecker(
				array_filter($section['items'], $isQuestion)
			);
		}
		foreach ($section['items'] as $item) {
			if ($item['type'] != 'instruction') {
				if (
					array_key_exists('condition', $item)
					&& $meetsCondition($item['condition'])
					&& !self::questionIsValid($item)
				)
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
