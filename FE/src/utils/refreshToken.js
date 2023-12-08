import axios from "axios";
import { getCookie } from "../helpers/funcs";

const refreshToken = async () => {
    try {
        const res = await axios.post('http://localhost:8000/v1/auth/refresh', { refreshToken: getCookie(process.env.REACT_APP_REFRESH_TOKEN_KEY) })
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export default refreshToken;