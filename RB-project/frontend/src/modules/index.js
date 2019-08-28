import { combineReducers } from "redux";
import blog from "./blog"; // **** 불러오기
import login from "./login";
export default combineReducers({
    blog,
    login
   // **** 추가
});
