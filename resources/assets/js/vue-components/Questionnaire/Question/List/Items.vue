<script>
import TextItem from './TextItem.vue';
import PublicationItem from './PublicationItem.vue';
import CommitteeItem from './CommitteeItem.vue';
import OngoingStudyItem from './OngoingStudyItem.vue';
import GrantItem from './GrantItem.vue';
import CertificationItem from './CertificationItem.vue';
import EditorialBoardItem from './EditorialBoardItem.vue';
import ReviewItem from './ReviewItem.vue';
import LectureItem from './LectureItem.vue';
import MentorshipItem from './MentorshipItem.vue';

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
		}
	},

	render(h) {
		let listEl = this.ordered ? 'ol' : 'ul';
		return h(listEl, this.items.map((item, index) => {
			const itemComponent = this.getItemComponent(item.type);


			return h(itemComponent, {
				props: {
					readonly: this.readonly,
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
					return 'ongoing-study-item';
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
			}
		}
	},

	components: {
		TextItem,
		PublicationItem,
		CommitteeItem,
		OngoingStudyItem,
		GrantItem,
		CertificationItem,
		EditorialBoardItem,
		ReviewItem,
		LectureItem,
		MentorshipItem
	}
};
</script>
