import * as AppActions from "../actions/AppActions"
import {setAppBarLinks} from "../actions/AppActions";


export const createAction_addNewOrder = value => {
    return {
        type: AppActions.addNewOrder,
        value: value
    }
}


export const createAction_setUserOrders = value => {
    return {
        type: AppActions.setUserOrders,
        value: value
    }
}


export const createAction_deleteFromUserCartByMangaID = (value) => {
    return {
        type: AppActions.deleteFromUserCartByMangaID,
        value: value
    }
}


export const createAction_addToUserCartManga = (value) => {
    return {
        type: AppActions.addToUserCartManga,
        value: value
    }
}


export const createAction_setUserStatus = (value) => {
    return {
        type: AppActions.setUserStatus,
        value: value
    }
}

export const createAction_setUserCart = (value) => {
    return {
        type: AppActions.setUserCart,
        value: value
    }
}

export const createAction_setAppBarLinks = (value) => {
    return {
        type: setAppBarLinks,
        value: value
    }
}

export const createAction_addToAppBarLinks = (value) => {
    return {
        type: AppActions.addToAppBarLinks,
        value: value
    }
}

export const createAction_deleteFromAppBarLinks = (value) => {
    return {
        type: AppActions.deleteFromAppBarLinks,
        value: value
    }
}