export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REQUEST":
      return { loading: true };
    case "USER_REQUEST_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGIN":
      return { loading: false, userInfo: action.payload };
    case "USER_REGISTER":
      return { loading: false, userInfo: action.payload };
    case "USER_LOGOUT":
      return {};
    default:
      return state;
  }
};
