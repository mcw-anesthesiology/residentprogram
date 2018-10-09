/** @format */

import ky from "@/modules/ky.js";

import { queryParams } from "@/modules/utils.js";
import { evaluationDateBetween } from "@/modules/evaluation-utils.js";

export default {
	namespaced: true,
	state: {
		mentees: [],
		mentors: [],
		menteeEvaluations: new Map()
	},
	getters: {
		dateRangeEvaluations(state) {
			return (menteeId, dates) => {
				if (!state.menteeEvaluations.has(menteeId)) return [];

				return state.menteeEvaluations
					.get(menteeId)
					.filter(e => evaluationDateBetween(e, dates));
			};
		}
	},
	mutations: {
		addMentees(state, mentees) {
			state.mentees = Array.from(
				new Set([...state.mentees, ...mentees]).values()
			);
		},
		addMentors(state, mentors) {
			state.mentees = Array.from(
				new Set([...state.mentors, ...mentors]).values()
			);
		},
		addEvaluations(state, evaluationObjMap) {
			const map = new Map(state.menteeEvaluations);
			for (const menteeId in evaluationObjMap) {
				const set = new Set([
					...(map.get(menteeId) || []),
					...evaluationObjMap[menteeId]
				]);

				map.set(Number(menteeId), Array.from(set.values()));
			}

			state.menteeEvaluations = map;
		}
	},
	actions: {
		fetchMentees({ commit }) {
			ky.get("/mentorships/mentees")
				.json()
				.then(mentees => {
					commit("addMentees", mentees);
				})
				.catch(err => {
					commit("error", err, { root: true });
				});
		},
		fetchMentors({ commit }) {
			ky.get("/mentorships/mentors")
				.json()
				.then(mentors => {
					commit("addMentors", mentors);
				})
				.catch(err => {
					commit("error", err, { root: true });
				});
		},
		fetchEvaluations({ commit }, { startDate, endDate }) {
			const query = queryParams({
				startDate,
				endDate
			});

			ky.get(`/mentorships/evaluations?${query}`)
				.json()
				.then(evalObjMap => {
					commit("addEvaluations", evalObjMap);
				})
				.catch(err => {
					commit("error", err, { root: true });
				});
		}
	}
};
