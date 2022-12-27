import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {Button} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import {useState} from "react";
import Select from 'react-select';
import api_socket from "../network";

const OrderCard = ({ is_manager, order, manager_page, statuses }) => {

    const [show, setShow] = useState(false);
    const [newOrderStatus, setNewOrderStatus] = useState(order.order_statusid.id)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getOptions = (cur_status) => {
        switch (cur_status) {
            case 14:
                return [
                    {
                        value: 9,
                        label: 'Заказ доставляется'
                    },
                    {
                        value: 13,
                        label: 'Заказ отклонен'
                    }
                ]
            case 9:
                return [
                    {
                        value: 14,
                        label: 'Заказ оплачен'
                    }
                ]
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>Заказ №{order.id}</Card.Title>
                    <Card.Text>
                        {is_manager ? <>Пользователь: {order.userid.username}<br/></>: undefined}
                        Дата заказа: {new Date(order.order_date).toLocaleString()}<br/>
                        Дата оплаты: {order.payment_date?new Date(order.payment_date).toLocaleString():'Еще не оплачено'}<br/>
                        Дата доставки: {order.delivery_date?new Date(order.delivery_date).toLocaleString():'Еще не доставлено'}<br/>
                        Стоимость: {order.order_price_sum} ₽<br/>
                        Текущий статус: {order.order_statusid.order_status_name}
                    </Card.Text>
                </Card.Body>

                <ListGroup className="list-group-flush" style={{alignSelf: "self-start"}}>
                    {order.ordered_manga.map((item, index) => {
                        return (
                            <ListGroup.Item key={index}>
                                {index + 1}) {item.manga_id.manga_name}, стоимостью {item.manga_id.cost} ₽
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>

                {!is_manager || !manager_page ? undefined:
                    <Card.Body>
                        <Button onClick={event => {
                            event.preventDefault()
                            handleShow()
                        }
                        }>Изменить статус</Button>
                    </Card.Body>
                }
            </Card>

            {!is_manager || !manager_page ? undefined:
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Изменение статуса заказа №{order.id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Новый статус:
                        <Select
                            className="basic-single"
                            classNamePrefix="статус"
                            defaultValue={statuses.map(item => {
                                return {
                                    value: item.id,
                                    label: item.order_status_name
                                }
                            }).filter(item => item.value === order.order_statusid.id)[0]}
                            name="color"
                            options={getOptions(newOrderStatus)}
                            onChange={choice => {
                                setNewOrderStatus(choice.value)}
                            }
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Закрыть
                        </Button>
                        <Button variant="primary" onClick={event => {
                            // запрос на изменение статуса
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
                                    order_statusid: newOrderStatus,
                                    delivery_date: newOrderStatus === 9? new Date('2022-12-31').toISOString() : null
                                })
                            };
                            fetch(`http://${api_socket}/orders/${order.id}/?all=true`, options)
                                .then(response => response.json())
                                .then(response => console.log(response))
                                .catch(err => console.error(err));
                            handleClose()
                        }}>
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    );
}

export default OrderCard;