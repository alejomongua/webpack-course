import {
  FETCH_FAILIRE,
  FETCH_SUCCESS
} from './actions'
export const fetchArticle = (state= {}, action) => {
  switch (action.type){
    case FETCH_SUCCESS:
      return {
        ...state,
        content: action.payload
      }
    case FETCH_FAILIRE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
