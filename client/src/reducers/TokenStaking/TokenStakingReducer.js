/* 
    Developer : Nishant Vadgama
    Date : 21-08-2018
    Fiel Comment : Token Staking reducer file 
*/
import {
    //WALLET TYPE LIST... 
    GETWALLETTYPELIST,
    GETWALLETTYPELIST_SUCCESS,
    GETWALLETTYPELIST_FAILURE,
    // get plan slab list...
    GET_SLABLIST,
    GET_SLABLIST_SUCCESS,
    GET_SLABLIST_FAILURE,
    //get pre confirmationd details...
    PRECONFIRMATIONDETAILS,
    PRECONFIRMATIONDETAILS_SUCCESS,
    PRECONFIRMATIONDETAILS_FAILURE,
    //staking request...
    STAKREQUEST,
    STAKREQUEST_SUCCESS,
    STAKREQUEST_FAILURE
} from "Actions/types";

//Set Initial State
const INITIAL_STATE = {
    stakingResponse: {},
    walletList: [],
    planlist: [],
    planResponse: {},
    preConfirmationDetails: {},
    showLoading: false
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        //get wallet type list...
        case GETWALLETTYPELIST:
            return { ...state, showLoading: true, walletList: [], preConfirmationDetails: {}, planResponse: {} }
        case GETWALLETTYPELIST_SUCCESS:
            return { ...state, showLoading: false, walletList: action.payload }
        case GETWALLETTYPELIST_FAILURE:
            return { ...state, showLoading: false, walletList: [] }
        //get plan list...
        case GET_SLABLIST:
            return { ...state, showLoading: true, planlist: [], planResponse: {}, preConfirmationDetails: {} };
        case GET_SLABLIST_SUCCESS:
            return { ...state, showLoading: false, planlist: action.payload.Details, planResponse: action.payload };
        case GET_SLABLIST_FAILURE:
            return { ...state, showLoading: false, planlist: [], planResponse: action.error };
        //pre confirmation details...
        case PRECONFIRMATIONDETAILS:
            return { ...state, showLoading: true, preConfirmationDetails: {}, planResponse: {} };
        case PRECONFIRMATIONDETAILS_SUCCESS:
            return { ...state, showLoading: false, preConfirmationDetails: action.payload };
        case PRECONFIRMATIONDETAILS_FAILURE:
            return { ...state, showLoading: false, preConfirmationDetails: action.error };
        //staking request
        case STAKREQUEST:
            return { ...state, showLoading: false, stakingResponse: {}, planResponse: {}, preConfirmationDetails: {} }
        case STAKREQUEST_SUCCESS:
            return { ...state, showLoading: false, stakingResponse: action.payload }
        case STAKREQUEST_FAILURE:
            return { ...state, showLoading: false, stakingResponse: action.error }
        default: return { ...state };
    }
}