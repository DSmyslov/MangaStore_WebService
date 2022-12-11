import * as CartActions from "../actions/CartPageActions"
import initialState from "../initialState";
import {combineReducers} from "@reduxjs/toolkit";


function loadingStatusReducer(state = initialState.ui.CartPage.loadingStatus, action) {
    switch (action.type) {
        case CartActions.setLoadingStatus:
            return action.value
        default: return state
    }
}


export const uiCartPageReducers = combineReducers({
    loadingStatus: loadingStatusReducer,
})