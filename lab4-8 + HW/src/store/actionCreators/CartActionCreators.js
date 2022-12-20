import * as CartActions from "../actions/CartPageActions"


export const createAction_setLoadingStatus = (value) => {
    return {
        type: CartActions.setLoadingStatus,
        value: value
    }
}