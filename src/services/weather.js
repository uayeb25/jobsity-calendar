import axios from "axios";

import {
    SETTINGS
} from '../utils/env';


export function getWeatherInformation(city) {
    return axios.get(`${SETTINGS.uri}?q=${city}&appid=${SETTINGS.uri_api}`);
}