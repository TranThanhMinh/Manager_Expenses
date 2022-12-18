
import { Action, ActionTypes } from '../actions/ActionTypes'
import { FloodReports } from '../../model/types.d'


interface State {
  comments: FloodReports|null;
  loading: boolean;
  error: string | null;
}

const initialState = {
  comments: null,
  loading: false, 
  error: null 
}

export const danangReducer = (state:State = initialState, action):State => {
  switch(action.type) {
      case ActionTypes.FLOOD_REPORTS_PENDING:
          return {
            comments: null,
            loading: true, 
            error: null 
          } 
      case ActionTypes.FLOOD_REPORTS_SUCCESS:
          return {
              loading: false,
              comments: action.data,
              error: null 
          }
      case ActionTypes.FLOOD_REPORTS_FAIL:
          return {
            comments: null,
              loading: false,
              error: action.data 
          }
      default: 
          return state;
  }
}