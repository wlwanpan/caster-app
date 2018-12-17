import { UPDATE_CONFIG, UPDATE_MOVIES } from '../actions/types'

const initialState = {
  config: {},
  deviceUUID: '',
  movies: [],
  musics: []
}

const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_CONFIG:
      return {
        ...state,
        config: action.payload
      }
    case UPDATE_MOVIES:
      return {
        ...state,
        movies: action.payload
      }
    default:
      return state
  }
}

export default appReducer