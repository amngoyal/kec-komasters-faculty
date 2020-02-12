import axios from 'axios'
import {errorLog, url} from './app-config';
import AccountManager from "./models/AccountManager";
import {ErrorResult, SuccessResult} from "./models/AppResult";

const instance = axios.create({
    baseURL: url,
    timeout: 30000,
    headers: {
        app_token: 'e0f07f280a5fee786538dfebd2d6e93843b91f53'
    }
});

export async function getFrom(route) {
    try {
        const token = await AccountManager.getAccessToken();
        const result = await instance.get(route, {
            headers: {
                Authorization: token
            }
        });

        return SuccessResult(result.data);
    } catch (e) {
        errorLog(e);
        if (e.response != null) {
            return ErrorResult(e.response.status)
        } else {
            return ErrorResult(500)
        }
    }
}

export default instance;
