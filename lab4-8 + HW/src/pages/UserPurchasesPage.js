import { useSelector, useDispatch } from "react-redux";
import React, {useEffect, useState} from "react";
import {fetchUserOrders} from "../store/middlewares/AppMiddlewares";
import { user_is_manager } from "../modules";
import {Col, Row} from "react-bootstrap";
import OrderCard from "../components/OrderCard";


function UserPurchasesPage() {

    const userStatus = useSelector(state => state.cached_data.App.userAuthorized)
    const userOrders = useSelector(state => state.cached_data.App.userOrders)
    const loadingStatus = useSelector(state => state.ui.OrdersPage.loadingStatus)
    const dispatch = useDispatch()

    useEffect(() => {

        if (userStatus) dispatch(fetchUserOrders())

    }, [userStatus])

    return (
        <>
            {!userStatus ? <div style={{marginTop: "10px", fontSize: "20px"}}>
                    Пожалуйста, авторизуйтесь для просмотра вашего списка заказов</div>:
                <div style={{marginTop: "10px", fontSize: "20px", width: "100%"}}>
                    <div style={{textAlign: "center"}}>Ваши заказы</div>
                    {loadingStatus ? undefined :
                        <div className={"container"}>
                            {userOrders.length === 0 ? <div>У вас пока нет заказов!</div>:
                                <Row xs={1} md={1} sm={1} lg={1} className="grid">
                                    {userOrders.map((item, index) => {
                                        return(
                                            <Col key={index}>
                                                <OrderCard is_manager={user_is_manager()}
                                                           order={item}
                                                           manager_page={false}/>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            }
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default UserPurchasesPage