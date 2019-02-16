import axios from 'axios/index';

export const GET_BIDS = '[BIDS APP] GET BIDS';

export function getBids()
{
    const request = axios.get('https://api.pierpontglobal.com/api/v1/car/latest?limit=40&offset=0');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_BIDS,
                payload: response.data
            })
        );
}