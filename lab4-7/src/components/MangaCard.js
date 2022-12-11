import {Button, Card} from "react-bootstrap";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import "../styles/MangaCardStyle.css";
import {useDispatch, useSelector} from "react-redux";
import {setUserCart} from "../store/actions/AppActions";
import {createAction_setUserCart} from "../store/actionCreators/AppActionsCreators";

const MangaCard = (manga) => {

    const [btnLoading, setbtnLoading] = useState(false)
    const user_cart = useSelector(state => state.cached_data.App.userCart)
    const userStatus = useSelector(state => state.cached_data.App.userAuthorized)
    const manga_list = useSelector(state => state.cached_data.StartPage.mangaList)
    const [qty, setQty] = useState(manga.quantity_in_stock)
    const dispatch = useDispatch()

    const clickHandler = async event => {
        event.preventDefault()
        setbtnLoading(true)
        let order_id
        let cur_cart
        if (user_cart.length === 0) {
            // нужно сделать запрос GET /current_cart/
            const get_cart_res = await (await fetch('http://localhost:8000/current_cart/', {
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    "X-CSRFToken": document.cookie
                        .split('; ')
                        .filter(row => row.startsWith('csrftoken='))
                        .map(c => c.split('=')[1])[0]
                }
            })).json()
            if (get_cart_res[0].order_id) order_id = get_cart_res[0].order_id
            else order_id = get_cart_res[0].id
            cur_cart = get_cart_res
        }
        else {
            cur_cart = user_cart
            if (cur_cart[0].order_id) order_id = cur_cart[0].order_id
            else order_id = cur_cart[0].id
        }
        // Проверим, есть ли данная манга в списке или нет
        console.log(cur_cart)
        const should_add = cur_cart[0].order_id === undefined || cur_cart.filter(item => item.manga_id.id === manga.id).length === 0
        if (should_add) {
            // осталось сделать POST /cart/ с параметрами order_id и manga_id
            const add_to_cart = await (await fetch('http://localhost:8000/cart/', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    "X-CSRFToken": document.cookie
                        .split('; ')
                        .filter(row => row.startsWith('csrftoken='))
                        .map(c => c.split('=')[1])[0]
                },
                body: JSON.stringify({
                    order_id: order_id,
                    manga_id: manga.id
                })
            })).json()
            dispatch(createAction_setUserCart(user_cart.concat({
                manga_id: manga_list.filter(item => item.id === manga.id)[0],
                id: add_to_cart.id,
                order_id: order_id

            })))
            setQty(qty - 1)
            setbtnLoading(false)
            console.log('Манга была добавлена в корзину!')
        }
        else console.log('Данная манга уже в вашей корзине!')
        setbtnLoading(false)
    }

    return <Card>
        <Link to={`/manga/${manga.id}`}>
            <Card.Img variant="top" src={`http://localhost:3000/${manga.manga_image}`}/>
        </Link>
        <Card.Body>
            <Link to={`/manga/${manga.id}`}>
                <Card.Title>{manga.manga_name}</Card.Title>
            </Link>
            <div className={"card-info"}>
                <div className={"manga-title"}>
                    Тайтл: {manga.title.title_name_eng? manga.title.title_name_eng:
                    (manga.title.title_name_rus? manga.title.title_name_rus: manga.title.title_name_jp)}
                </div>
                <div className={"in_stock_qty"}>
                    На складе: {qty} шт.
                </div>
                <div className={"one_instance_price"}>
                    Стоимость: {manga.cost} ₽
                </div>
            </div>
            {!userStatus ? undefined:
                <div className={"card-link-to"}>
                    <Button variant="primary" disabled={btnLoading} onClick={clickHandler}>Добавить в корзину</Button>
                </div>
            }
        </Card.Body>
    </Card>
}

export default MangaCard;
