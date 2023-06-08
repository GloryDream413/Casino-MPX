import { combineReducers } from "redux";
import {Auth} from "./auth.reducers";

const reducers = combineReducers({
    auth: Auth,
})

export default reducers;
