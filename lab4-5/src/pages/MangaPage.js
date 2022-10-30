import React, {useEffect, useState} from 'react';
import {Col, Row, Spinner, Button} from "react-bootstrap";
import {getGenresOfManga, getAuthorsOfManga, getMangaById} from "../modules";
import {useParams} from "react-router";
import MangaFullInfo from "../components/MangaFullInfo";
import "../styles/MangaPageStyle.css";
import HorizontalList from "../components/ListGroup";


function MangaPage() {

    const { id_manga } = useParams();

    const [loading, setLoading] = useState(true);

    const [manga, setManga] = useState({});

    const [genres, setGenres] = useState([]);

    const [authors, setAuthors] = useState([]);

    const LoadPage = async () => {
        await setManga(await getMangaById(id_manga));
        await setGenres(await getGenresOfManga(id_manga));
        await setAuthors(await getAuthorsOfManga(id_manga));
        await setLoading(false);
    }

    useEffect(() => {

        console.log('Пытаемся получить информацию о манге');
        LoadPage();

    }, [])

    return (
        <div className={`main-container ${loading && 'containerLoading'}`}>
            {loading ? <div className={"hide-while-loading-page"}><Spinner animation="border"/></div> :
            <div className={"container"}>
                {!manga.id ? <div className={"empty-result-message"}><h1>Кажется, в нашем магазине нет такой манги :(</h1></div>:
                    <>
                        <Row xs={1} md={1} sm={1} lg={2} className="grid">
                            <Col className={"img"}>
                                <img src={`http://localhost:8000/static/${manga.manga_image}`}
                                     alt={"manga"} className={"manga-img"} />
                            </Col>
                            <Col className={"info"}>
                                <MangaFullInfo {...manga}/>
                                {!authors.length ? <div>Кажется, мы не знаем авторов этой манги</div>:
                                    <div className={"authors"}>
                                        Автор{authors.length > 1? 'ы':''}: {authors.map((value, index) => {
                                        return (
                                            `${index ? ', ': ''}${value.id_author.author_name}`
                                        )
                                    })}
                                    </div>
                                }
                                {!genres.length ? <div>Кажется, мы не знаем жанры этой манги</div>:
                                    <div className={"genres"}>
                                        Жанр{genres.length > 1 ? 'ы': ''}: <HorizontalList {...genres}/>
                                    </div>
                                }
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
        }
        </div>
    );

}

export default MangaPage;