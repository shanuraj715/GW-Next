import { API, OPERATION_CANCELED } from '/constants'
import axios from 'axios'

const cancelTokens = {};

const handleResponse = (response) => {
    const responseStatus = response.data.status;

    if (responseStatus) {
        return response.data;
    }
    error("Logged from request.js:12")
    return response;
};

export function handleError(error) {
    if (axios.isCancel(error)) {
        const cancelMessage = { message: OPERATION_CANCELED };
        throw cancelMessage;
    } else {
        throw error.response;
    }
}

export const cancelRequest = (endpoint) => {
    if (typeof cancelTokens[endpoint] !== typeof undefined) {
        cancelTokens[endpoint].cancel(OPERATION_CANCELED);
        delete cancelTokens[endpoint];
    }
};

export const getRequest = (endpoint, params, cancelPrevious = true) => {
    if (
        cancelPrevious &&
        typeof cancelTokens[endpoint] !== typeof undefined &&
        typeof window !== 'undefined'
    ) {
        cancelTokens[endpoint].cancel(OPERATION_CANCELED);
        delete cancelTokens[endpoint];
    }

    cancelTokens[endpoint] = axios.CancelToken.source(); // do not cancel on server

    let url = ''
    if (API.URL) {
        url = `${API.URL}${endpoint}`;
    }
    return axios({
        method: 'get',
        cancelToken: cancelTokens[endpoint].token,
        url,
        params,
    })
        .then(handleResponse)
        .catch(handleError);
};

export const postRequest = (endpoint, params, cancelPrevious = true) => {
    if (
        cancelPrevious &&
        typeof cancelTokens[endpoint] !== typeof undefined &&
        typeof window !== 'undefined'
    ) {
        cancelTokens[endpoint].cancel(OPERATION_CANCELED);
        delete cancelTokens[endpoint];
    }

    cancelTokens[endpoint] = axios.CancelToken.source(); // do not cancel on server

    let url = '';
    if (API.URL) {
        url = `${API.URL}${url}`;
    }
    return axios({
        method: 'post',
        cancelToken: cancelTokens[endpoint].token,
        url,
        data: params,
    })
        .then(handleResponse)
        .catch(handleError);
};