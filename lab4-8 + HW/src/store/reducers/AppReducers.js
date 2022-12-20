import initialState from "../initialState";
import {combineReducers} from "@reduxjs/toolkit";
import * as AppActions from "../actions/AppActions";


function orderStatusesReducer(state = initialState.cached_data.App.orderStatuses, action) {
    switch (action.type) {
        case AppActions.setOrderStatuses:
            return action.value
        default: return state
    }
}


function userIsManagerReducer(state = initialState.cached_data.App.userIsManager, action) {
    switch (action.type) {
        case AppActions.setUserManagerStatus:
            return action.value
        default: return state
    }
}

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

function MangaTitlesReducer(state = initialState.cached_data.App.mangaTitles, action) {
    switch (action.type) {
        case AppActions.setMangaTitles:
            return action.value
        default: return state
    }
}

function MangaMediaTypesReducer(state = initialState.cached_data.App.mangaMediaTypes, action) {
    switch (action.type) {
        case AppActions.setMangaMediaTypes:
            return action.value
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
    userIsManager: userIsManagerReducer,
    orderStatuses: orderStatusesReducer,
    userCart: UserCartReducer,
    userOrders: UserOrdersReducer,
    mangaTitles: MangaTitlesReducer,
    mangaMediaTypes: MangaMediaTypesReducer
})

export const uiAppReducers = combineReducers({
    AppBarLinks: AppBarLinksReducer,
})