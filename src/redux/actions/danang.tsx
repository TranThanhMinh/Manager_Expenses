
import { Action, ActionTypes } from '../actions/ActionTypes'
import Service from '../../common/Service';
import {
    district, token, chaWard, list_flood_reports,
    create_reports, get_flood_report_detail, create_reports_sos,
    up_image, street
} from '../../common/Api'


export const getFloodReports = params => {
    return async (dispatch) => {
        dispatch({ type: ActionTypes.FLOOD_REPORTS_PENDING })
        Service.getApi(list_flood_reports).then(data => {
            if (data.status == 'success') {
                
                dispatch({ type: ActionTypes.FLOOD_REPORTS_SUCCESS, data:data })
            } else {
                dispatch({ type: ActionTypes.FLOOD_REPORTS_FAIL, data })
            }
        }).catch(message => dispatch({ type: ActionTypes.FLOOD_REPORTS_FAIL, message }))
    }
}

