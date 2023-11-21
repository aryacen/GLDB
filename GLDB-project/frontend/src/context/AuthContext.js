import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    dark: JSON.parse(localStorage.getItem("dark")) || false,
  };

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                token: null,
                loading: true,
                error: null,
                dark: false,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                token: action.token,
                loading: false,
                error: null,
                dark: false,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                token: null,
                loading: false,
                error: action.payload,
                dark: false,
            };
        case "UPDATE_FAILURE":
            return {
                user: state.user,
                token: state.token,
                loading: false,
                error: action.payload,
                dark: state.dark,
            }
        case "LOGOUT":
            return {
                user: null,
                token: null,
                loading: false,
                error: null,
                dark: false,
            }
            case "CLICK_TOGGLE":
                const newDarkValue = !state.dark;
                localStorage.setItem("dark", newDarkValue); // Update localStorage here
                return {
                  ...state,
                  dark: newDarkValue,
                };
        case "UPDATE_USER":
            return {
                user: action.payload,
                token: state.token,
                loading: false,
                error: null,
                dark: state.dark,
            };
        default:
            return state;
    }
};

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("token", state.token);
        localStorage.setItem("dark", state.dark)
      }, [state.user, state.token, state.dark]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                token: state.token,
                loading: state.loading,
                error: state.error,
                dark: state.dark,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


