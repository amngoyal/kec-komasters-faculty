import axios from 'axios'
import {url} from './app-config';

const instance = axios.create({
    baseURL: url,
    timeout: 30000,
    headers: {
        app_token: 'e0f07f280a5fee786538dfebd2d6e93843b91f53'
    }
});
export default instance;
