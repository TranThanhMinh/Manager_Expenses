import * as ActionTypes from '../actions/ActionTypes'

function danangReducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.TOKEN_PENDING:
    case ActionTypes.DISTRICT_PENDING:
    case ActionTypes.FLOOD_REPORTS_PENDING:
    case ActionTypes.CREATE_REPORTS_PENDING:
    case ActionTypes.FLOOD_REPORTS_DETAIL_PENDING:
    case ActionTypes.CREATE_REPORTS_SOS_PENDING:
    case ActionTypes.UP_IMAGE_PENDING:
    case ActionTypes.STREET_PENDING:
    case ActionTypes.CHA_WARD_PENDING: {
      return {
        ...state,
        type: action.type,
        message: ''
      };
    }
    case ActionTypes.TOKEN_SUCCESS:
    case ActionTypes.DISTRICT_SUCCESS:
    case ActionTypes.FLOOD_REPORTS_SUCCESS:
    case ActionTypes.FLOOD_REPORTS_DETAIL_SUCCESS:
    case ActionTypes.CREATE_REPORTS_SUCCESS:
    case ActionTypes.CREATE_REPORTS_SOS_SUCCESS:
    case ActionTypes.UP_IMAGE_SUCCESS:
    case ActionTypes.STREET_SUCCESS:
    case ActionTypes.CHA_WARD_SUCCESS: {
      return {
        ...state,
        type: action.type,
        data: action.data,
        message: ''
      };
    }
    case ActionTypes.TOKEN_FAIL:
    case ActionTypes.DISTRICT_FAIL:
    case ActionTypes.FLOOD_REPORTS_FAIL:
    case ActionTypes.CREATE_REPORTS_FAIL:
    case ActionTypes.FLOOD_REPORTS_DETAIL_FAIL:
    case ActionTypes.CREATE_REPORTS_SOS_FAIL:
    case ActionTypes.UP_IMAGE_FAIL:
    case ActionTypes.STREET_FAIL:
    case ActionTypes.CHA_WARD_FAIL: {
      return {
        ...state,
        type: action.type,
        data: action.data,
        message: action.message || 'Error',
      };
    }
    case ActionTypes.CLEAR:
      {
        return {
          ...state,
          type: action.type,
          message: '',
          index: new Date().getTime(),
        }
      }

    default:
      return state
  }
}

export default danangReducer