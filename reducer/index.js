import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import productReducer from './productReducer'


const Reducers = combineReducers({
    loginReducer,
    productReducer
});
 
export default Reducers