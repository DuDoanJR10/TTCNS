import instanceAxios from '../../../utils/instanceAxios';

export const login = async (user) => {
    try {
        const res = await instanceAxios.post('/v1/auth/login', user);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const register = async (user) => {
    try {
        const res = await instanceAxios.post('/v1/auth/register', user);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const logout = async (axiosJWT, accessToken, id) => {
    try {
        const res = await axiosJWT.post('http://localhost:8000/v1/auth/logout', id, {
            headers: { token: `Bearer ${accessToken}`},
        });
        console.log('res: ', res);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}