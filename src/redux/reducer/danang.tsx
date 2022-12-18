
import { Action, ActionTypes } from '../actions/ActionTypes'
import { FloodReports } from '../../model/types.d'


interface State {
  danang: FloodReports | null;
  loading: boolean;
  error: string | null;
}

const initialState = {
  danang: null,
  loading: false,
  error: null
}

export const danangReducer = (state: State = initialState, action): State => {
  switch (action.type) {
    case ActionTypes.FLOOD_REPORTS_PENDING:
      return {
        danang: null,
        loading: true,
        error: null
      }
    case ActionTypes.FLOOD_REPORTS_SUCCESS:
      return {
        loading: false,
        danang: action.data,
        error: null
      }
    case ActionTypes.FLOOD_REPORTS_FAIL:
      return {
        danang: null,
        loading: false,
        error: action.data
      }
    default:
      return state;
  }
}