<script>
import TextItem from './TextItem.vue';
import PublicationItem from './PublicationItem.vue';
import CommitteeItem from './CommitteeItem.vue';
import StudyItem from './StudyItem.vue';
import GrantItem from './GrantItem.vue';
import CertificationItem from './CertificationItem.vue';
import EditorialBoardItem from './EditorialBoardItem.vue';
import ReviewItem from './ReviewItem.vue';
import LectureItem from './LectureItem.vue';
import MentorshipItem from './MentorshipItem.vue';
import DatedEventItem from './DatedEventItem.vue';

export default {
	props: {
		items: {
			type: Array,
			required: true
		},
		ordered: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		propsReadonly: {
			type: Object,
			default() {
				return {};
			}
		},
		itemsRemovable: {
			type: Boolean,
			default: true
		},
		showErrors: {
			type: Boolean,
			default: false
		},
		helpClass: {
			type: String,
			required: false
		},
		suggestions: {
			type: Object,
			required: false
		}
	},

	render(h) {
		let listEl = this.ordered ? 'ol' : 'ul';
		return h(listEl, this.items.map((item, index) => {
			const itemComponent = this.getItemComponent(item.type);


			return h(itemComponent, {
				props: {
					readonly: this.readonly,
					propsReadonly: this.propsReadonly,
					showErrors: this.showErrors,
					helpClass: this.helpClass,
					suggestions: this.suggestions,
					removable: this.itemsRemovable,
					...item
				},
				on: {
					input: item => {
						let items = Array.slice(this.items);
						items[index] = Object.assign({}, items[index], item);

						this.$emit('change', items);
					},
					remove: () => {
						let items = Array.slice(this.items);
						items.splice(index, 1);

						this.$emit('change', items);
					}
				}
			});
		}));
	},

	methods: {
		getItemComponent(type) {
			switch(type) {
				case 'text':
					return 'text-item';
				case 'publication':
					return 'publication-item';
				case 'committee':
					return 'committee-item';
				case 'study':
					return 'study-item';
				case 'grant':
				case 'grantOther':
					return 'grant-item';
				case 'certification':
					return 'certification-item';
				case 'editorialBoard':
					return 'editorial-board-item';
				case 'review':
					return 'review-item';
				case 'lecture':
				case 'audienceLecture':
					return 'lecture-item';
				case 'mentorship':
				case 'subjectMentorship':
					return 'mentorship-item';
				case 'datedEvent':
					return 'dated-event-item';
			}
		}
	},

	components: {
		TextItem,
		PublicationItem,
		CommitteeItem,
		StudyItem,
		GrantItem,
		CertificationItem,
		EditorialBoardItem,
		ReviewItem,
		LectureItem,
		MentorshipItem,
		DatedEventItem
	}
};
</script>

<style scoped>
	ul, ol {
		padding-left: 1em;
	}
</style>
