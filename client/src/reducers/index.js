import { combineReducers } from 'redux';
import noteReducer from './noteReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer,
    note: noteReducer,
    errors: errorReducer
});