import { UPDATE_CONFIG, UPDATE_MOVIES } from './types'

export const updateConfig = (config) => {
  return {
    type: UPDATE_CONFIG,
    payload: config
  }
}

export const updateMovies = (movies) => {
  return {
    type: UPDATE_MOVIES,
    payload: movies
  }
}