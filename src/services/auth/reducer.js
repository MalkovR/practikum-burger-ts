import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_ERROR,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_ERROR,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_ERROR,
  USER_RENEW_TOKEN_REQUEST,
  USER_RENEW_TOKEN_SUCCESS,
  USER_RENEW_TOKEN_ERROR,
  SET_AUTH_CHECKED,
} from "./actions";

const initialState = {
  user: {
    email: "",
    name: "",
  },
  isUserLoaded: false,
  isAuthChecked: false,
  loading: false,
  error: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        isUserLoaded: true,
        isAuthChecked: true,
        user: {
          email: action.payload.email,
          name: action.payload.name,
        },
      };
    }
    case USER_REGISTER_ERROR: {
      return {
        ...state,
        loading: false,
        isAuthChecked: true,
        error: action.payload,
      };
    }
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        isUserLoaded: true,
        isAuthChecked: true,
        user: {
          email: action.payload.email,
          name: action.payload.name,
        },
      };
    }
    case USER_LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        isAuthChecked: true,
        error: action.payload,
      };
    }
    case USER_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        loading: false,
        isUserLoaded: false,
        isAuthChecked: true,
        user: {
          email: "",
          name: "",
        },
      };
    }
    case USER_LOGOUT_ERROR: {
      return {
        ...state,
        loading: false,
        isAuthChecked: true,
        error: action.payload,
      };
    }
    case USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        isUserLoaded: true,
        isAuthChecked: true,
        user: {
          email: action.payload.email,
          name: action.payload.name,
        },
      };
    }
    case USER_PROFILE_ERROR: {
      return {
        ...state,
        loading: false,
        isAuthChecked: true,
        error: action.payload,
      };
    }
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        isUserLoaded: true,
        isAuthChecked: true,
        user: {
          email: action.payload.email,
          name: action.payload.name,
        },
      };
    }
    case USER_UPDATE_PROFILE_ERROR: {
      return {
        ...state,
        loading: false,
        isAuthChecked: true,
        error: action.payload,
      };
    }
    case USER_RENEW_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_RENEW_TOKEN_SUCCESS: {
      return {
        ...state,
        loading: false,
        isAuthChecked: true,
      };
    }
    case USER_RENEW_TOKEN_ERROR: {
      return {
        ...state,
        loading: false,
        isAuthChecked: true,
        error: action.payload,
      };
    }
    case SET_AUTH_CHECKED: {
      return {
        ...state,
        loading: false,
        isAuthChecked: true,
      };
    }
    default:
      return state;
  }
};
