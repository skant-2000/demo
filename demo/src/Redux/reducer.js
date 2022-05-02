import { LOGOUT_USER, SET_USER_POST, VALID_USER_DETAIL } from "./actions";

const init = {
  currentUser: null,
  authenticUserPost: null
};

export const reducer = (store = init, { type, payload }) => {
  switch (type) {
    case VALID_USER_DETAIL: {
      return {
        ...store,
        currentUser: payload
      }
    }
    case SET_USER_POST: {
      return {
        ...store,
        authenticUserPost: payload
      }
    }
    case LOGOUT_USER: {
      return {
        ...store,
        currentUser: null
      }
    }
    default:
      return store;
  }
};
