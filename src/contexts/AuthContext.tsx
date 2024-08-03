// import {
//   createUser,
//   getUser,
//   login as GQLLogin,
//   logout as GQLLogout,
// } from "gqlite-lib/dist/client/auth";
import { createContext, useEffect, useReducer } from "react";
import { fetcher, postData } from "../utils/api-helpers";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null as any,
};

const handlers = {
  INITIALIZE: (state: any, action: any) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: any, action: any) => {
    const { user } = action.payload;
    debugger;
    localStorage.setItem("token", user.token);
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: any) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state: any, action: any) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state: any, action: any) =>
  // @ts-ignore
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  login: null as any,
  logout: null as any,
  register: null as any,
});

export const AuthProvider = (props: any) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      const token = localStorage.getItem("token");

      let user = null;
      if (token) {
        user = await fetcher("users/token");
      }

      if (user) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await postData("users/login", { email, password });
      //change
      // const user = {};
      dispatch({
        type: "LOGIN",
        payload: {
          user,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    // await GQLLogout();
    //change

    dispatch({ type: "LOGOUT" });
  };

  const register = async (email: string, password: string) => {
    // const user = await createUser(email, password);
    //change
    const user = {};

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
