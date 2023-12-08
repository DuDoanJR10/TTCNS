import Cookies from 'js-cookie';

const JWT = {
    getAccessToken: () => {
        return Cookies.get(process.env.ACCESS_TOKEN_KEY) || null;
    }
}
export default JWT;