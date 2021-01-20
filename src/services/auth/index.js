import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import axios from 'axios';
import {
    ENV_BASE_URL,
    ENV_X_API_KEY,
} from '@env';

const apiBase = axios.create({baseURL: ENV_BASE_URL});

export const signInService = (options) => {
    return new Promise((resolve, reject) => {
        apiBase(`dev/passwordlesslogin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'x-api-key': ENV_X_API_KEY,
                'x-api-key': ENV_X_API_KEY,
            },
            data: {
                ...options,
                // prefix: app_prefix,
                // mode: app_mode
            },
        })
            .then((response) => {
                let data = response.data;
                if (data?.access_token !== undefined) {
                    AsyncStorage.multiSet([
                        ['access_token', data?.access_token],
                        ['refresh_token', data?.refresh_token],
                        ['id_token', data?.id_token],
                    ]);
                    resolve({token: data?.access_token, id_token: data?.id_token});
                } else {
                    reject(false);
                }
            })
            .catch((error) => {
                console.log('login failed ', error);
                reject(false);
            });
    });
};

export const tokenVerifyService = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('access_token')
            .then((token) => {
                console.log('token ===> ', token)
                // fetch(`${BASE_URL}dev/tokenverified`, {
                apiBase(`dev/tokenverified`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'x-api-key': ENV_X_API_KEY,
                    },
                    data: {
                        token,
                        // prefix: app_prefix,
                        // mode: app_mode
                    }
                })
                    .then(async (response) => {
                        let data = response.data;
                        if (data?.msg === 'success') {
                            try {
                                let id_token = await AsyncStorage.getItem('id_token');
                                resolve({token, id_token});
                            } catch (e) {
                                reject(null)
                            }
                            // dispatch({type: 'REFRESH_TOKEN', access_token: token});
                        } else {
                            // dispatch({type: 'REFRESH_TOKEN', access_token: null});
                            reject(null);
                        }
                    })
                    .catch((error) => {
                        // dispatch({type: 'REFRESH_TOKEN', access_token: null});
                        reject(null);
                    })
            })
            .catch(err => {
                reject(null);
            });
    });
};

export const requestCodeService = (options) => {
    return new Promise((resolve, reject) => {
        // fetch(`${BASE_URL}dev/passwordless`, {
        apiBase(`dev/passwordless`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': ENV_X_API_KEY,
            },
            data: {
                ...options,
                // prefix: app_prefix,
                // mode: app_mode,
            },
        })
            .then((response) => {
                let data = response.data;
                if (data?.MessageId) {
                    resolve(data?.MessageId);
                } else {
                    reject(false);
                }
            })
            .catch((error) => {
                console.log('error ===> ', error);
                Alert.alert(error);
                reject(false);
            })
    });
};
