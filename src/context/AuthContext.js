import React, {useContext, useReducer} from 'react';
import {signInService, tokenVerifyService} from '../services/auth';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    access_token: null,
    id_token: null,
    isSignout: true,
    user: {},
    isLoading: false,
    tokenVerifying: false,
};

const AuthStateContext = React.createContext(initialState);
const AuthDispatchContext = React.createContext();

function AuthReducer(prevState = initialState, action) {
    switch (action.type) {
        case 'REFRESH_TOKEN_REQ':
            return {
                ...prevState,
                isLoading: true,
                tokenVerifying: true,
            };
        case 'REFRESH_TOKEN_SUC':
            return {
                ...prevState,
                access_token: action.access_token,
                id_token: action.id_token,
                isLoading: false,
                isSignout: false,
                user: {...action.user},
                tokenVerifying: false,
            };
        case 'REFRESH_TOKEN_ERR':
            return {
                ...prevState,
                isLoading: false,
                isSignout: true,
                tokenVerifying: false,
            };
        case 'SIGN_IN_REQ':
            return {
                ...prevState,
                isLoading: true,
                isSignout: true,
            };
        case 'SIGN_IN_SUC':
            return {
                ...prevState,
                access_token: action.access_token,
                id_token: action.id_token,
                isLoading: false,
                isSignout: false,
                user: {...action.user},
            };
        case 'SIGN_IN_ERR':
            return {
                ...prevState,
                isLoading: false,
                isSignout: true,
            };
        case 'SIGN_OUT':
            return {
                ...prevState,
                access_token: null,
                isLoading: false,
                isSignout: true,
            };
        case 'SET_USER':
            return {
                ...prevState,
                user: action.user,
            };
        default:
            return prevState;
    }
}

function AuthProvider({children}) {
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
}

function useAuthState() {
    const context = useContext(AuthStateContext);
    if (!Boolean(context)) {
        return {};
    }
    return context;
}

function useAuthDispatch() {
    const context = useContext(AuthDispatchContext);
    if (!Boolean(context)) {
        return null;
    }
    return context;
}

function signIn(dispatch, option) {
    dispatch({type: 'SIGN_IN_REQ'});
    signInService(option).then(res => {
        let user = jwtDecode(res.id_token);
        dispatch({
            type: 'SIGN_IN_SUC',
            access_token: res.token,
            id_token: res.id_token,
            user
        });
    }).catch(err => {
        dispatch({type: 'SIGN_IN_ERR'});
    });
}

function tokenVerify(dispatch) {
    dispatch({type: 'REFRESH_TOKEN_REQ'});
    tokenVerifyService().then(res => {
        dispatch({type: 'REFRESH_TOKEN_SUC', access_token: res.token, id_token: res.id_token});
    }).catch(err => {
        dispatch({type: 'REFRESH_TOKEN_ERR'});
    });
}

async function signOut(dispatch, option) {
    await AsyncStorage.clear();
    dispatch({type: 'SIGN_OUT'});
}

export {
    AuthStateContext,
    AuthProvider,
    useAuthDispatch,
    useAuthState,
    signIn,
    signOut,
    tokenVerify,
};
