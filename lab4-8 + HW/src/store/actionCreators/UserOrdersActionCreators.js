import * as UserOrdersActions from "../actions/UserOrdersPage"


export const createAction_setLoadingStatus = (value) => {
    return {
        type: UserOrdersActions.setLoadingStatus,
        value: value
    }
}