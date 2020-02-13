import {KEY_ACCESS_TOKEN, KEY_REFRESH_TOKEN, KEY_CURRENT_USER, KEY_EXPIRATION_TIME} from '../utils/constants';
import jwt from 'jsonwebtoken';
import {errorLog} from "../app-config";
import instance from "../axios";

class AccountManager {
    refreshToken;
    accessToken;
    user;
    expirationTime;

    setUserData() {
        if (this.isLoggedIn()) {
            this.refreshToken = localStorage.getItem(KEY_REFRESH_TOKEN);
            this.accessToken = localStorage.getItem(KEY_ACCESS_TOKEN);
            this.user = JSON.parse(localStorage.getItem(KEY_CURRENT_USER));
            this.expirationTime = Number(localStorage.getItem(KEY_EXPIRATION_TIME));
        }
    }

    saveUserData(accessToken, refreshToken, userData) {
        const decoded = jwt.decode(accessToken);
        const exp = decoded.exp - 60;

        localStorage.setItem(KEY_CURRENT_USER, JSON.stringify(userData));
        localStorage.setItem(KEY_REFRESH_TOKEN, refreshToken);
        localStorage.setItem(KEY_ACCESS_TOKEN, accessToken);
        localStorage.setItem(KEY_EXPIRATION_TIME, String(exp));

        this.setUserData();
    }

    deleteUserData() {
        localStorage.removeItem(KEY_ACCESS_TOKEN);
        localStorage.removeItem(KEY_REFRESH_TOKEN);
        localStorage.removeItem(KEY_CURRENT_USER);
        localStorage.removeItem(KEY_EXPIRATION_TIME);

        this.accessToken = null;
        this.refreshToken = null;
        this.user = null;
        this.expirationTime = null;
    }

    getUserData() {
        return this.user;
    }

    async getAccessToken() {
        if (Math.floor(Date.now() / 1000) > this.expirationTime) {
            await this.getNewAccessToken()
        }

        return this.accessToken;
    }

    getRefreshToken() {
        return this.refreshToken;
    }

    isLoggedIn() {
        let act = localStorage.getItem(KEY_ACCESS_TOKEN);
        let rft = localStorage.getItem(KEY_REFRESH_TOKEN);
        let user = localStorage.getItem(KEY_CURRENT_USER);
        let exp = localStorage.getItem(KEY_CURRENT_USER);

        if (act == null || rft == null || user == null || exp == null) {
            return false;
        }

        return !(act === "" || rft === "" || user === "" || user === "{}");
    }

    async getNewAccessToken() {
        try {
            let response = await instance.get('/auth/refresh', {
                headers: {
                    Authorization: this.refreshToken
                }
            });

            this.updateAccessToken(response.data);

        } catch (e) {
            errorLog(e);
            window.dispatchEvent(new Event('session_expired'));
            this.deleteUserData();

        }

    }

    updateAccessToken(token) {
        this.accessToken = token;
        const decoded = jwt.decode(token);
        this.expirationTime = decoded.exp - 60;
        localStorage.setItem(KEY_ACCESS_TOKEN, this.accessToken);
        localStorage.setItem(KEY_EXPIRATION_TIME, this.expirationTime);
    }
}

export default new AccountManager()
