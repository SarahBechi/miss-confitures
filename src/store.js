import { createStore, combineReducers } from "redux";
import SearchFilter from './customer/reducers/searchFilter';

import a_ZFilter from './customer/reducers/a_ZFilter';


const store = createStore(combineReducers({
    SearchFilter: SearchFilter,
    a_ZFilter: a_ZFilter,



}))


export default store;