import React, {useEffect, useState} from 'react';
import {Col, Row, Spinner, Button} from "react-bootstrap";
import {useParams} from "react-router";
import MangaFullInfo from "../components/MangaFullInfo";
import "../styles/MangaPageStyle.css";
import HorizontalList from "../components/ListGroup";
import BasicBreadcrumbs from "../components/Breadcrumbs";
import {useDispatch, useSelector} from "react-redux";
import fetchMangaInfo from "../store/middlewares/MangaPageMiddlewares";
import api_socket from "../network";


function MangaPage() {

    const { id_manga } = useParams();

    const loadingStatus = useSelector(state => state.ui.MangaPage.loadingStatus)
    const manga = useSelector(state => state.cached_data.MangaPage.mangaById)
    const authors = useSelector(state => state.cached_data.MangaPage.authorsOfManga)
    const genres = useSelector(state => state.cached_data.MangaPage.genresOfManga)
    const user_cart = useSelector(state => state.cached_data.App.userCart)
    const [btnLoaidng, setbtnLoading] = useState(false)
    const userStatus = useSelector(state => state.cached_data.App.userAuthorized)

    const dispatch = useDispatch()

    const clickHandler = async event => {
        event.preventDefault()
        setbtnLoading(true)
        let order_id = undefined
        if (user_cart.length === 0) {
            // нужно сделать запрос GET /current_cart/
            const get_cart_res = await (await fetch(`http://${api_socket}/current_cart/`, {
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    "X-CSRFToken": document.cookie
                        .split('; ')
                        .filter(row => row.startsWith('csrftoken='))
                        .map(c => c.split('=')[1])[0]
                }
            })).json()
            order_id = get_cart_res[0].id
            const add_to_cart = await (await fetch(`http://${api_socket}/cart/`, {
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
            console.log(add_to_cart)
            setbtnLoading(false)
        }
        else order_id = user_cart[0].order_id
        // Проверим, есть ли данная манга в списке или нет
        const shoold_add = user_cart.filter(item => item.manga_id.id === manga.id).length === 0
        if (shoold_add) {
            // осталось сделать POST /cart/ с параметрами order_id и manga_id
            const add_to_cart = await (await fetch(`http://${api_socket}/cart/`, {
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
            console.log(add_to_cart)
            setbtnLoading(false)
        }
        console.log('Данная манга уже в вашей корзине!')
        setbtnLoading(false)
    }

    useEffect(() => {

        dispatch(fetchMangaInfo(id_manga))

    }, [])

    return (
        <>
            <div className={`main-container ${loadingStatus && 'containerLoading'}`}>
                {loadingStatus ? <div className={"hide-while-loading-page"}><Spinner animation="border"/></div> :
                    <>
                        <BasicBreadcrumbs props={[
                            {
                                ref: '/',
                                text: 'Начальная страница'
                            },
                            {
                                ref: '/manga',
                                text: 'Список доступной манги'
                            },
                            {
                                ref: `manga/${id_manga}`,
                                text: `${manga.manga_name}`
                            }
                        ]}/>
                        <div className={"container"}>
                            {!manga.id ? <div className={"empty-result-message"}><h1>Кажется, в нашем магазине нет такой манги :(</h1></div>:
                                <>
                                    <Row xs={1} md={1} sm={1} lg={2} className="grid">
                                        <Col  className={"img"}>
                                            <img src={`http://${window.location.host}/${manga.manga_image}`}
                                                 alt={"manga"} className={"manga-img"} />
                                        </Col>
                                        <Col className={"info"}>
                                            <MangaFullInfo {...manga}/>
                                            <br/>
                                            {!authors.length ? <div>К сожалению, мы не знаем авторов этой манги</div>:
                                                <div className={"authors"}>
                                                    Автор{authors.length > 1? 'ы':''}: {authors.map((value, index) => {
                                                    return (
                                                        `${index ? ', ': ''}${value.id_author.author_name}`
                                                    )
                                                })}
                                                </div>
                                            }
                                            <br/>
                                            {!genres.length ? <div>К сожалению, мы не знаем жанры этой манги</div>:
                                                <div className={"genres"}>
                                                    Жанр{genres.length > 1 ? 'ы': ''}: <HorizontalList {...genres}/>
                                                </div>
                                            }
                                            <br/>
                                            <div className={"manga-stock"}>
                                                На складе: {manga.quantity_in_stock} шт.
                                            </div>
                                            <div className={"manga-cost"}>
                                                Стоимость: {manga.cost} ₽
                                            </div>
                                            {!userStatus? undefined:
                                                <div className={"add-to-cart-btn"}>
                                                    <Button onClick={clickHandler}
                                                            disabled={btnLoaidng}
                                                            variant="primary">Добавить в корзину</Button>
                                                </div>
                                            }
                                        </Col>
                                    </Row>
                                </>
                            }
                        </div>
                    </>
                }
            </div>
        </>
    );

}

export default MangaPage;