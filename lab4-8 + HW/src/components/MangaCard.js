import {Button, Card} from "react-bootstrap";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import "../styles/MangaCardStyle.css";
import {useDispatch, useSelector} from "react-redux";
import {createAction_setUserCart} from "../store/actionCreators/AppActionsCreators";
import Modal from 'react-bootstrap/Modal';
import {TextField} from "@mui/material";
import api_socket from "../network";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import {createAction_setMangaList} from "../store/actionCreators/StartPageActionCreators";

const MangaCard = ({manga, is_manager}) => {

    const [btnLoading, setbtnLoading] = useState(false)
    const user_cart = useSelector(state => state.cached_data.App.userCart)
    const userStatus = useSelector(state => state.cached_data.App.userAuthorized)
    const manga_list = useSelector(state => state.cached_data.StartPage.mangaList)
    const [qty, setQty] = useState(manga.quantity_in_stock)
    const [name, setName] = useState(manga.manga_name)
    const [cost, setCost] = useState(manga.cost)
    const [show, setShow] = useState(false);
    const [nameField, setNameField] = useState(name);
    const [costField, setCostField] = useState(cost);
    const [qtyField, setQtyField] = useState(qty);
    const [releaseDate, setReleaseDate] = useState(manga.release_date);
    const [synopsis, setSynopsis] = useState(manga.synopsis);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()

    const clickHandler = async event => {
        event.preventDefault()
        setbtnLoading(true)
        let order_id
        let cur_cart
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
            <Card.Img variant="top" src={`http://${window.location.host}/${manga.manga_image}`}/>
        </Link>
        <Card.Body>
            <Link to={`/manga/${manga.id}`}>
                <Card.Title>{name}</Card.Title>
            </Link>
            <div className={"card-info"}>
                <div className={"manga-title"}>
                    {manga.title ?
                        <>
                            Тайтл: {manga.title.title_name_eng? manga.title.title_name_eng:
                            (manga.title.title_name_rus? manga.title.title_name_rus: manga.title.title_name_jp)}
                        </>:
                        undefined
                    }
                </div>
                <div className={"in_stock_qty"}>
                    На складе: {qty} шт.
                </div>
                <div className={"one_instance_price"}>
                    Стоимость: {cost} ₽
                </div>
            </div>
            {!userStatus ? undefined:
                <div className={"card-link-to"}>
                    <Button variant="primary" disabled={btnLoading} onClick={clickHandler}>Добавить в корзину</Button>
                </div>
            }
            {!is_manager ? undefined :
                <>
                    <Button onClick={event => {
                        event.preventDefault()
                        handleShow()
                    }}
                    >
                        Изменить
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Редактирование информации о манге</Modal.Title>
                        </Modal.Header>
                        <Modal.Body
                            style={{
                                gap:"10px",
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >
                            <TextField id="change-manga-name" label={"Название манги"} variant="outlined"
                                       value={nameField}
                                       onChange={event => {
                                           event.preventDefault()
                                           setNameField(event.target.value)
                                       }}
                                       style={{width:"100%"}}
                            />
                            <TextField id="change-manga-qty" label={"Количество на складе"} variant="outlined"
                                       value={qtyField}
                                       onChange={event => {
                                           event.preventDefault()
                                           setQtyField(event.target.value)
                                       }}
                                       style={{width:"100%"}}
                            />
                            <TextField id="change-manga-cost" label={"Стоимость манги"} variant="outlined"
                                       value={costField}
                                       onChange={event => {
                                           event.preventDefault()
                                           setCostField(event.target.value)
                                       }}
                                       style={{width:"100%"}}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Дата выхода"
                                    value={releaseDate}
                                    onChange={(newValue) => {
                                        setReleaseDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                    inputFormat="DD/MM/YYYY"
                                />
                            </LocalizationProvider>
                            <TextField
                                id="change-manga-synopsis"
                                label={"Описание манги"}
                                variant="outlined"
                                value={synopsis}
                                onChange={event => {
                                    event.preventDefault()
                                    setSynopsis(event.target.value)
                                }}
                                style={{width:"100%"}}
                                multiline={true}
                                rows={10}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant={"secondary"} onClick={handleClose}>
                                Закрыть
                            </Button>
                            <Button variant={"primary"} onClick={event => {
                                event.preventDefault()
                                // логика и запрос изменения манги
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
                                        manga_name: nameField,
                                        quantity_in_stock: qtyField,
                                        cost: costField,
                                        release_date: releaseDate,
                                        synopsis: synopsis
                                    })
                                };
                                fetch(`http://${api_socket}/manga/${manga.id}/`, options)
                                    .then(response => response.json())
                                    .then(response => console.log(response))
                                    .then(() => {
                                        setName(nameField)
                                        setQty(qtyField)
                                        setCost(costField)
                                    })
                                    .catch(err => console.error(err));
                                handleClose()
                            }
                            }>
                                Сохранить
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Button
                        onClick={event => {
                            // запрос на изменение одного поля в манге
                            const options = {
                                credentials: 'include',
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                    "X-CSRFToken": document.cookie
                                        .split('; ')
                                        .filter(row => row.startsWith('csrftoken='))
                                        .map(c => c.split('=')[1])[0]
                                },
                                body: JSON.stringify({
                                    shown: 0
                                })
                            };
                            fetch(`http://${api_socket}/manga/${manga.id}/`, options)
                                .then(response => response.json())
                                .then(response => {
                                    console.log(response)
                                    dispatch(createAction_setMangaList(manga_list.filter(item => item.id !== manga.id)))
                                })
                                .catch(err => console.error(err));
                        }
                    }>
                        Удалить
                    </Button>
                </>
            }
        </Card.Body>
    </Card>
}

export default MangaCard;
