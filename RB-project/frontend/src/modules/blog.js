import { createAction, handleActions } from "redux-actions";

const CHANGE_VIEW = "blog/CHANGE_VIEW"; // 인풋 값 변경


// createAction 으로 액션 생성함수 정의
export const changeView = createAction(CHANGE_VIEW, status => status);

// **** 초기 상태 정의
const initialState = {
  redirect:false
};

// **** handleActions 로 리듀서 함수 작성
export default handleActions(
  {
    [CHANGE_VIEW]: (state, action) => ({
      ...state,
      redirect: action.payload
    })
  },
  initialState
);
