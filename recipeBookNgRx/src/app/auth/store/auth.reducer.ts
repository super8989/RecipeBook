import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
}

const initialState = {
  user: null,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  console.log('authReducer', state, action);

  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );

      return {
        ...state,
        user,
        // user: user
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}