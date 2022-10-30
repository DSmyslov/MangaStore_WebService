import {Button, Card} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";
import "../styles/MangaCardStyle.css";

const MangaCard = (manga) => {
    return <Card>
        <Link to={`/manga/${manga.id}`}>
            <Card.Img variant="top" src={`http://localhost:8000/static/${manga.manga_image}`} height="300" />
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
                    На складе: {manga.quantity_in_stock} шт.
                </div>
                <div className={"one_instance_price"}>
                    Стоимость: {manga.cost} ₽
                </div>
            </div>
            <div className={"card-link-to"}>
                <Button href={`http://localhost:3000/manga`} target="" variant="primary">Добавить в корзину</Button>
            </div>
        </Card.Body>
    </Card>
}

export default MangaCard;
