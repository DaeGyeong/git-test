import { createAction, handleActions } from "redux-actions";

const CHANGE_STATUS = "login/CHANGE_STATUS"; // 인풋 값 변경


// createAction 으로 액션 생성함수 정의
export const changeStatus = createAction(CHANGE_STATUS, status => status);

// **** 초기 상태 정의
const initialState = {
  login:localStorage.getItem("username")?true:false
};

// **** handleActions 로 리듀서 함수 작성
export default handleActions(
  {
    [CHANGE_STATUS]: (state, action) => ({
      ...state,
      login: action.payload
    })
  },
  initialState
);
