import initialState from "../initialState";
import {combineReducers} from "@reduxjs/toolkit";
import * as AppActions from "../actions/AppActions";


function userAuthorizedReducer(state = initialState.cached_data.App.userAuthorized, action) {
    switch (action.type) {
        case AppActions.setUserStatus:
            return action.value
        default: return state
    }
}

function AppBarLinksReducer(state = initialState.ui.App.AppBarLinks, action) {
    switch (action.type) {
        case AppActions.addToAppBarLinks:
            return state.concat(action.value)
        case AppActions.deleteFromAppBarLinks:
            return state.slice(0, -1)
        default: return state
    }
}

export const cached_dataAppReducers = combineReducers({
    userAuthorized: userAuthorizedReducer,
})

export const uiAppReducers = combineReducers({
    AppBarLinks: AppBarLinksReducer,
})