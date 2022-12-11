import * as CartPageActionCreators from "../actionCreators/CartActionCreators";
import * as UserOrdersActionCreators from "../actionCreators/UserOrdersActionCreators";
import * as AppActionCreators from "../actionCreators/AppActionsCreators";
import { getCurrentCart, getUserOrders } from "../../modules";
import {createAction_setUserCart, createAction_setUserOrders} from "../actionCreators/AppActionsCreators";


export const fetchUserCart = () => async dispatch => {
    dispatch(CartPageActionCreators.createAction_setLoadingStatus(true))
    const data = await getCurrentCart()
    dispatch(createAction_setUserCart(data))
    dispatch(CartPageActionCreators.createAction_setLoadingStatus(false))
}

export const fetchUserOrders = () => async dispatch => {
    dispatch(UserOrdersActionCreators.createAction_setLoadingStatus(true))
    const data = await getUserOrders()
    dispatch(createAction_setUserOrders(data))
    dispatch(UserOrdersActionCreators.createAction_setLoadingStatus(false))
}
