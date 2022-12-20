import * as UserOrdersActions from "../actions/UserOrdersPage"
import initialState from "../initialState";
import {combineReducers} from "@reduxjs/toolkit";


function loadingStatusReducer(state = initialState.ui.OrdersPage.loadingStatus, action) {
    switch (action.type) {
        case UserOrdersActions.setLoadingStatus:
            return action.value
        default: return state
    }
}


export const uiUserOrdersReducers = combineReducers({
    loadingStatus: loadingStatusReducer,
})