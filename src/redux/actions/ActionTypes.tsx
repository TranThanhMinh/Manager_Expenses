// export const CLEAR = "CLEAR"

// export const TOKEN_PENDING = 'TOKEN_PENDING'
// export const TOKEN_SUCCESS = 'TOKEN_SUCCESS'
// export const TOKEN_FAIL = 'TOKEN_FAIL'

// export const DISTRICT_PENDING = 'DISTRICT_PENDING'
// export const DISTRICT_SUCCESS = 'DISTRICT_SUCCESS'
// export const DISTRICT_FAIL = 'DISTRICT_FAIL'

// export const CHA_WARD_PENDING = 'CHA_WARD_PENDING'
// export const CHA_WARD_SUCCESS = 'CHA_WARD_SUCCESS'
// export const CHA_WARD_FAIL = 'CHA_WARD_FAIL'

// export const FLOOD_REPORTS_PENDING = 'FLOOD_REPORTS_PENDING'
// export const FLOOD_REPORTS_SUCCESS = 'FLOOD_REPORTS_SUCCESS'
// export const FLOOD_REPORTS_FAIL = 'FLOOD_REPORTS_FAIL'

// export const CREATE_REPORTS_PENDING = 'CREATE_REPORTS_PENDING'
// export const CREATE_REPORTS_SUCCESS = 'CREATE_REPORTS_SUCCESS'
// export const CREATE_REPORTS_FAIL = 'CREATE_REPORTS_FAIL'

// export const FLOOD_REPORTS_DETAIL_PENDING = 'FLOOD_REPORTS_DETAIL_PENDING'
// export const FLOOD_REPORTS_DETAIL_SUCCESS = 'FLOOD_REPORTS_DETAIL_SUCCESS'
// export const FLOOD_REPORTS_DETAIL_FAIL = 'FLOOD_REPORTS_DETAIL_FAIL'

// export const CREATE_REPORTS_SOS_PENDING = 'CREATE_REPORTS_SOS_PENDING'
// export const CREATE_REPORTS_SOS_SUCCESS = 'CREATE_REPORTS_SOS_SUCCESS'
// export const CREATE_REPORTS_SOS_FAIL = 'CREATE_REPORTS_SOS_FAIL'

// export const UP_IMAGE_PENDING = 'UP_IMAGE_PENDING'
// export const UP_IMAGE_SUCCESS = 'UP_IMAGE_SUCCESS'
// export const UP_IMAGE_FAIL = 'UP_IMAGE_FAIL'


// export const STREET_PENDING = 'STREET_PENDING'
// export const STREET_SUCCESS = 'STREET_SUCCESS'
// export const STREET_FAIL = 'STREET_FAIL'

import { FloodReports } from '../../model/types.d';


export enum ActionTypes {

    FLOOD_REPORTS_PENDING = 'FLOOD_REPORTS_PENDING',
    FLOOD_REPORTS_SUCCESS = 'FLOOD_REPORTS_SUCCESS',
    FLOOD_REPORTS_FAIL = 'FLOOD_REPORTS_FAIL'
}

interface actionPending {
    type: ActionTypes.FLOOD_REPORTS_PENDING;
}

interface actionSuccess {
    type: ActionTypes.FLOOD_REPORTS_SUCCESS;
    payload: FloodReports;
}

interface actionFail {
    type: ActionTypes.FLOOD_REPORTS_FAIL;
    payload: string;
}

export type Action = actionPending | actionSuccess | actionFail;


