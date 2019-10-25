import * as types from "./types";
import api from "../../api";
import { access } from "fs";
import {
  setStorageAccessToken,
  setStorageRefreshToken
} from "../../db/selectors";

const initialState: types.SessionState = {
  accessToken: null,
  refreshToken: null,
  user: null
};

const sessionReducer = (
  state: types.SessionState = initialState,
  action: types.SESSION_ACTION_TYPES
) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      if (!action.data) {
        return {
          ...initialState
        };
      }

      const currentUser = action.data;
      state.user = currentUser;
      //db.setCurrentUser(currentUser);

      return {
        ...initialState,
        ...action.data
      };

    case types.SET_CURRENT_TOKEN:
      if (
        !action.data ||
        !action.data.accessToken ||
        !action.data.refreshToken
      ) {
        return {
          ...initialState
        };
      }

      state.accessToken = action.data.accessToken;
      state.refreshToken = action.data.refreshToken;
      setStorageAccessToken(state.accessToken);
      setStorageRefreshToken(state.refreshToken);
      api.setAuthorizationHeader(state.accessToken);

      return {
        ...initialState,
        ...action.data
      };

    default:
      return state;
  }
};

export default sessionReducer;
