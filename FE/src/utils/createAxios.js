import refreshToken from './refreshToken';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { saveCookie, deleteCookie } from '../helpers/funcs';

const axiosJWT = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create()
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwtDecode(user?.accessToken);
            console.log('AccessToken hết hạn?: ', !!(decodedToken.exp < date.getTime() / 1000))
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                if (!data) {
                    user = null;
                    console.log('RefreshToken expired!');
                    deleteCookie(process.env.REACT_APP_ACCESS_TOKEN_KEY);
                    deleteCookie(process.env.REACT_APP_REFRESH_TOKEN_KEY);
                    config.headers["expired"] = true
                    config.headers["token"] = null;
                } else {
                    const refreshUser = {
                        ...user,
                        accessToken: data?.accessToken
                    }
                    saveCookie(process.env.REACT_APP_ACCESS_TOKEN_KEY, data?.accessToken);
                    saveCookie(process.env.REACT_APP_REFRESH_TOKEN_KEY, data?.refreshToken);
                    // Update info user
                    dispatch(stateSuccess(refreshUser));
                    config.headers["token"] = "Bearer " + data.accessToken;
                }
            }
            console.log('config: ', config);
            return config;
        },
        (err) => {
            return Promise.reject(err);
        })
    return newInstance;
} 

export default axiosJWT;