import axios from 'axios/index';
import {FuseUtils} from '@fuse';
import {showMessage} from 'store/actions/fuse';

export const GET_PRODUCT = '[E-COMMERCE APP] GET PRODUCT';
export const SAVE_PRODUCT = '[E-COMMERCE APP] SAVE PRODUCT';

export function getProduct(params)
{
    const request = axios.get('https://api.pierpontglobal.com/api/v1/car/latest?limit=50&offset=50', {params});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_PRODUCT,
                payload: response.data
            })
        );
}

export function saveProduct(data)
{
    const request = axios.get('https://api.pierpontglobal.com/api/v1/car/latest?limit=200&offset=1000');

    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Product Saved'}));

                return dispatch({
                    type   : SAVE_PRODUCT,
                    payload: response.data
                })
            }
        );
}

export function newProduct()
{
    const data = {
        id              : FuseUtils.generateGUID(),
        name            : '',
        handle          : '',
        description     : '',
        categories      : [],
        tags            : [],
        images          : [],
        priceTaxExcl    : 0,
        priceTaxIncl    : 0,
        taxRate         : 0,
        comparedPrice   : 0,
        quantity        : 0,
        sku             : '',
        width           : '',
        height          : '',
        depth           : '',
        weight          : '',
        extraShippingFee: 0,
        active          : true
    };

    return {
        type   : GET_PRODUCT,
        payload: data
    }
}
