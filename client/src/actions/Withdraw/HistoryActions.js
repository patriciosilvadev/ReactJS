// import from types
import {
    GET_WITHDRAW_HISTORY,
    GET_WITHDRAW_HISTORY_SUCCESS,
    GET_WITHDRAW_HISTORY_FAILURE,
} from '../types';

/* 
    Developer : Nishant Vadgama
    Date : 13-09-2018
    Comment :  Function for dispatch Get Withdraw History Action
*/
export const getWithdrawalHistory = (request) => ({
    type: GET_WITHDRAW_HISTORY,
    request : request
});

/* 
    Developer : Nishant Vadgama
    Date : 13-09-2018
    Comment :  Function for dispatch Get Withdraw History Success Action
*/
export const getWithdrawalHistorySuccess = (response) => ({    
    type: GET_WITHDRAW_HISTORY_SUCCESS,    
    payload: response
})

/* 
    Developer : Nishant Vadgama
    Date : 13-09-2018
    Comment :  Function for dispatch Get Withdraw History Failure Action
*/
export const getWithdrawalHistoryFailure = (error) => ({
    type: GET_WITHDRAW_HISTORY_FAILURE,
    payload: error
})

