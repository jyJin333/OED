/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import TimeInterval from '../../../common/TimeInterval';
import * as baselinesActions from '../actions/baselines';


const defaultState = {
	newBaseline: {
		meterID: null,
		calcStart: '',
		calcEnd: '',
		applyStart: '',
		applyEnd: '',
		submitted: false,
		dirty: false,
	},
	details: null,
	isFetching: false,
	dirty: true
};

export default function baselines(state = defaultState, action) {
	switch (action.type) {
		case baselinesActions.CREATE_NEW_BASELINE:
			return state;

		case baselinesActions.MARK_NEW_BASELINE_SUBMITTED:
			return {
				...state,
				newBaseline: {
					...state.newBaseline,
					submitted: true
				}
			};

		case baselinesActions.MARK_NEW_BASELINE_NOT_SUBMITTED:
			return {
				...state,
				newBaseline: {
					...state.newBaseline,
					submitted: false
				}
			};

		case baselinesActions.EDIT_NEW_BASELINE_CALC_START:
			return {
				...state,
				newBaseline: {
					...state.newBaseline,
					calcStart: action.timestamp
				}
			};

		case baselinesActions.EDIT_NEW_BASELINE_CALC_END:
			return {
				...state,
				newBaseline: {
					...state.newBaseline,
					calcEnd: action.timestamp
				}
			};

		case baselinesActions.EDIT_NEW_BASELINE_APPLY_START:
			return {
				...state,
				newBaseline: {
					...state.newBaseline,
					applyStart: action.timestamp
				}
			};

		case baselinesActions.EDIT_NEW_BASELINE_APPLY_END:
			return {
				...state,
				newBaseline: {
					...state.newBaseline,
					applyEnd: action.timestamp
				}
			};

		case baselinesActions.EDIT_NEW_BASELINE_METER_ID:
			return {
				...state,
				newBaseline: {
					...state.newBaseline,
					meterID: action.id
				}
			};

		case baselinesActions.RECEIVE_ALL_BASELINES: {
			const newBaselines = action.data.map(baseline => ({
				...baseline,
				applyRange: new TimeInterval(baseline.applyRange.startTimestamp, baseline.applyRange.endTimestamp),
				calcRange: new TimeInterval(baseline.calcRange.startTimestamp, baseline.calcRange.endTimestamp),
				readings: [
					[
						Math.round(new Date(baseline.applyRange.startTimestamp).getTime()),
						baseline.baselineValue
					],
					[
						Math.round(new Date(baseline.applyRange.endTimestamp).getTime()),
						baseline.baselineValue
					]
				]
			}));
			return {
				...state,
				details: newBaselines
			};
		}

		default:
			return state;
	}
}