import * as AppActions from "../actions/AppActions"


export const createAction_setUserStatus = (value) => {
    return {
        type: AppActions.setUserStatus,
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