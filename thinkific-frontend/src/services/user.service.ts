import axios from "../config/initializers/axios";

const path = '/user';

export const userServices = {
    auth,
    logout,
};

async function auth(payload: object, type: string) {
    return await axios.post(`${path}/${type}`, payload);
}

async function logout(refreshToken: string) {
    return await axios.put(`${path}/logout`, {refreshToken});
}
