import axios from 'axios/index';
import { ApiServer } from '../../../../../../Defaults';

export const GET_PRODUCTS = '[E-COMMERCE APP] GET PRODUCTS';
export const SET_PRODUCTS_SEARCH_TEXT = '[E-COMMERCE APP] SET PRODUCTS SEARCH TEXT';

export function getProducts()
{
    const request = axios.get(`${ApiServer}/api/v1/car/latest?limit=40&offset=0`);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PRODUCTS,
                payload: response.data
            })
        );
}

export function setProductsSearchText(event)
{
    return {
        type      : SET_PRODUCTS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

