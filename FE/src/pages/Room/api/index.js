import axios from "axios";

export const getListRoom = () => {
    return axios.get(`${process.env.REACT_APP_URL_API}/v1/api/room/get-all`);
}

export const deleteRoom = (id, axiosJWT, accessToken) => {
    return axiosJWT.delete(`${process.env.REACT_APP_URL_API}/v1/api/room/${id}`, {
        headers: { token: `Bearer ${accessToken}`}
    })
}