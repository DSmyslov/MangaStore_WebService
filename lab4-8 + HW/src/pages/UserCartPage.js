import { useSelector, useDispatch } from "react-redux";
import {useEffect, useState} from "react";
import {Button, Col, Row, Spinner} from "react-bootstrap";
import "../styles/StartPageStyle.css";
import CartMangaCards from "../components/CartMangaCards";
import {fetchUserCart} from "../store/middlewares/AppMiddlewares";
import {useHistory} from "react-router";
import api_socket from "../network";


function UserCartPage() {

    const userStatus = useSelector(state => state.cached_data.App.userAuthorized)
    const loadingStatus = useSelector(state => state.ui.CartPage.loadingStatus)
    const user_cart = useSelector(state => state.cached_data.App.userCart)
    const [btnLoading, setBtnLoading] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {

        dispatch(fetchUserCart())

    }, [])

    return (
        <>
            {!userStatus ? <div style={{marginTop: "10px", fontSize: "20px"}}>Пожалуйста, авторизуйтесь для доступа к корзине</div>:
                <div style={{marginTop: "10px", fontSize: "20px", display:"flex", justifyContent: "center", flexDirection: "column", width: '100%'}}>
                    <div style={{textAlign: "center"}}>Ваша корзина</div>
                    {loadingStatus ? <div className={"hide-while-loading-page"}
                                          style={{justifyContent: "center"}}><Spinner animation={"border"}/></div>:
                        <>
                            {user_cart.length === 0 || user_cart[0].manga_id === undefined ? <div style={{textAlign: "center"}}>Ваша корзина пуста! Закажите мангу у нас</div> :
                                <div className={"container"}>
                                    <Row xs={1} md={3} sm={2} lg={4} className="grid">
                                        {user_cart.map((item, index) => {
                                            return (
                                                <Col key={index}>
                                                    <CartMangaCards {...item.manga_id}/>
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                    <Button
                                        disabled={btnLoading}
                                        onClick={async ev => {
                                        ev.preventDefault()
                                            setBtnLoading(true)
                                            const options = {
                                                method: 'PATCH',
                                                credentials: 'include',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    "X-CSRFToken": document.cookie
                                                        .split('; ')
                                                        .filter(row => row.startsWith('csrftoken='))
                                                        .map(c => c.split('=')[1])[0]
                                                },
                                                body: JSON.stringify({
                                                    order_statusid: 8,
                                                    payment_date: new Date().toISOString()
                                                })
                                            };
                                            fetch(`http://${api_socket}/orders/${user_cart[user_cart.length - 1].order_id}/`, options)
                                                .then(response => response.json())
                                                .then(response => console.log(response))
                                                .catch(err => console.error(err));
                                            setBtnLoading(false)
                                            history.push('/purchases')
                                    }}
                                    >
                                        Оформить заказ
                                    </Button>
                                </div>
                            }
                        </>
                    }
                </div>
            }
        </>
    )
}

export default UserCartPage