import initialState from "../initialState";
import {combineReducers} from "@reduxjs/toolkit";
import * as AppActions from "../actions/AppActions";
import userCartPage from "../../pages/UserCartPage";


function userAuthorizedReducer(state = initialState.cached_data.App.userAuthorized, action) {
    switch (action.type) {
        case AppActions.setUserStatus:
            return action.value
        default: return state
    }
}

function UserCartReducer(state = initialState.cached_data.App.userCart, action) {
    switch (action.type) {
        case AppActions.setUserCart:
            return action.value
        case AppActions.addToUserCartManga:
            return [...state, ...action.value]
        case AppActions.deleteFromUserCartByMangaID:
            return state.filter(item => item.manga_id.id !== action.value)
        default: return state
    }
}


function UserOrdersReducer(state = initialState.cached_data.App.userOrders, action) {
    switch (action.type) {
        case AppActions.addNewOrder:
            return [...state, ...action.value]
        case AppActions.setUserOrders:
            return action.value
        default:
            return state
    }
}


function AppBarLinksReducer(state = initialState.ui.App.AppBarLinks, action) {
    switch (action.type) {
        case AppActions.addToAppBarLinks:
            return [...state, ...action.value]
        case AppActions.deleteFromAppBarLinks:
            return state.filter(item => item.title !== action.value)
        case AppActions.setAppBarLinks:
            return action.value
        default: return state
    }
}

export const cached_dataAppReducers = combineReducers({
    userAuthorized: userAuthorizedReducer,
    userCart: UserCartReducer,
    userOrders: UserOrdersReducer,
})

export const uiAppReducers = combineReducers({
    AppBarLinks: AppBarLinksReducer,
})