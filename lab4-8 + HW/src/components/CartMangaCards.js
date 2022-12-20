import {Button, Card} from "react-bootstrap";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import "../styles/MangaCardStyle.css";
import {useDispatch, useSelector} from "react-redux";
import {createAction_setUserCart} from "../store/actionCreators/AppActionsCreators";
import api_socket from "../network";

const CartMangaCards = (Manga) => {

    const user_cart = useSelector(state => state.cached_data.App.userCart)
    const [btnLoading, setbtnLoading] = useState(false)
    const dispatch = useDispatch()

    // Удаление
    const clickHandler = async event => {
        event.preventDefault()
        setbtnLoading(true)
        console.log(user_cart)
        const record_to_delete = user_cart.filter(item => item.manga_id.id === Manga.id)[0].id
        await fetch(`http://${api_socket}/cart/${record_to_delete}/`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                "X-CSRFToken": document.cookie
                    .split('; ')
                    .filter(row => row.startsWith('csrftoken='))
                    .map(c => c.split('=')[1])[0]
            }
        })
        dispatch(createAction_setUserCart(user_cart.filter(elem => elem.manga_id.id !== Manga.id)))
        setbtnLoading(false)
        console.log('Манга удалена из корзины!')
    }

    return (
        <Card>
            <Link to={`/manga/${Manga.id}`}>
                <Card.Img variant="top" src={`http://${window.location.host}/${Manga.manga_image}`}/>
            </Link>
            <Card.Body>
                <Link to={`/manga/${Manga.id}`}>
                    <Card.Title>{Manga.manga_name}</Card.Title>
                </Link>
                <div className={"card-info"}>
                    <div className={"manga-title"}>
                        Тайтл: {Manga.title.title_name_eng? Manga.title.title_name_eng:
                        (Manga.title.title_name_rus? Manga.title.title_name_rus: Manga.title.title_name_jp)}
                    </div>

                    <div className={"one_instance_price"}>
                        Стоимость: {Manga.cost} ₽
                    </div>
                </div>
                <div className={"card-link-to"}>
                    <Button onClick={clickHandler} disabled={btnLoading} variant="primary">Убрать из корзины</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CartMangaCards;
