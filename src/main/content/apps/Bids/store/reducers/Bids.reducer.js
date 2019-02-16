import * as actions from '../actions';

const initialState = {
    data      : [],
    searchText: ''
};

const BidsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case actions.GET_BIDS:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        /* case actions.SET_PRODUCTS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        } */
        default:
        {
            return state;
        }
    }
};

export default BidsReducer;
