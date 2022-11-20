import React, {useEffect} from 'react';
import {Col, Row, Spinner, Button} from "react-bootstrap";
import {useParams} from "react-router";
import MangaFullInfo from "../components/MangaFullInfo";
import "../styles/MangaPageStyle.css";
import HorizontalList from "../components/ListGroup";
import BasicBreadcrumbs from "../components/Breadcrumbs";
import {useDispatch, useSelector} from "react-redux";
import fetchMangaInfo from "../store/middlewares/MangaPageMiddlewares";


function MangaPage() {

    const { id_manga } = useParams();

    const loadingStatus = useSelector(state => state.ui.MangaPage.loadingStatus)

    const manga = useSelector(state => state.cached_data.MangaPage.mangaById)

    const authors = useSelector(state => state.cached_data.MangaPage.authorsOfManga)

    const genres = useSelector(state => state.cached_data.MangaPage.genresOfManga)

    const dispatch = useDispatch()

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
                                        <Col className={"img"}>
                                            <img src={`http://localhost:3000/${manga.manga_image}`}
                                                 alt={"manga"} className={"manga-img"} />
                                        </Col>
                                        <Col className={"info"}>
                                            <MangaFullInfo {...manga}/>
                                            <br/>
                                            {!authors.length ? <div>Кажется, мы не знаем авторов этой манги</div>:
                                                <div className={"authors"}>
                                                    Автор{authors.length > 1? 'ы':''}: {authors.map((value, index) => {
                                                    return (
                                                        `${index ? ', ': ''}${value.id_author.author_name}`
                                                    )
                                                })}
                                                </div>
                                            }
                                            <br/>
                                            {!genres.length ? <div>Кажется, мы не знаем жанры этой манги</div>:
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
                                            <div className={"add-to-cart-btn"}>
                                                <Button href={`http://localhost:3000/manga/${id_manga}`} target="" variant="primary">Добавить в корзину</Button>
                                            </div>
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