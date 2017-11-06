When making change to questionnaire, must duplicate changes in the following places:

1. `questionnaire.json` schema
	- For lists, `listTypes` and the type definition itself
2. Types in `resources/assets/js/modules/questionnaire/index.js`
	- For lists, `listTypes` and the type definition itself
	- For new question types:
		- `isQuestion`
		- `questionMatchesValue`
		- `getValue` and `getValues`
		- `getResponse` and `getResponses`
3. Validation in `resources/assets/js/modules/questionnaire/validate.js`
4. Scoring in `resources/assets/js/modules/questionnaire/scoring.js`
5. Validation in `app/Helpers/QuestionnaireValidation.php`
	- For new question types:
		- `isQuestion`
		- `questionMatchesValue`
		- `questionIsValid`
6. Relevant components in `resources/assets/js/vue-components/Questionnaire/`
	- Make sure to update parent component for new child types
		- `List/Items.vue` for new list item types
		- `Question.vue` for new question types
