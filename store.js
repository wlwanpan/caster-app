import { createStore, combineReducers } from 'redux';
import appReducer from './src/reducers/appReducer';

const rootReducer = combineReducers({
  app: appReducer
});

const configureStore = () => {
  return createStore(rootReducer)
}

export default configureStore
