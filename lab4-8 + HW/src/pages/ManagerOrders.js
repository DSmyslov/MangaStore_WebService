import { useSelector, useDispatch } from "react-redux";
import React, {useEffect, useState} from "react";
import {fetchOrderStatuses, fetchUserOrders} from "../store/middlewares/AppMiddlewares";
import { user_is_manager } from "../modules";
import {Button, Col, Row} from "react-bootstrap";
import OrderCard from "../components/OrderCard";
import Select from "react-select";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


function ManagerOrders() {

    const userStatus = useSelector(state => state.cached_data.App.userAuthorized)
    const userOrders = useSelector(state => state.cached_data.App.userOrders)
    const loadingStatus = useSelector(state => state.ui.OrdersPage.loadingStatus)
    const orderStatuses = useSelector(state => state.cached_data.App.orderStatuses)
    const [filtersStatuses, setFiltersStatuses] = useState([])
    const [startValue, setStartValue] = useState(null);
    const [endValue, setEndValue] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {

        if (userStatus) {
            dispatch(fetchOrderStatuses())
            dispatch(fetchUserOrders(true))
        }

    }, [userStatus])

    return (
        <>
            {!userStatus ? <div style={{marginTop: "10px", fontSize: "20px"}}>
                    Пожалуйста, авторизуйтесь для просмотра списка заказов</div>:
                <div style={{marginTop: "10px", fontSize: "20px", width: "100%", display:"flex", flexDirection: "column", justifyContent:"center"}}>
                    <div style={{textAlign: "center"}}>Фильтр заказов</div>

                    <div className={"filters_and_search"} style={{width: "80%", alignSelf: "center", display:"flex", justifyContent:"center", flexDirection:"column"}}>
                        Статус заказа:
                        <Select
                            // defaultValue={}
                            isMulti
                            name="OrderStatuses"
                            options={orderStatuses.map(item => {
                                return {
                                    value: item.id,
                                    label: item.order_status_name
                                }
                            })}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={choice => {
                                setFiltersStatuses(choice.map(item => item.value))
                            }}
                        />
                        <div style={{marginBottom: "10px"}}>
                            Дата заказа:
                        </div>
                        <div style={{display: "flex", justifyContent: "center", gap: "20px"}}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Начальная дата"
                                    value={startValue}
                                    onChange={(newValue) => {
                                        setStartValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                    inputFormat="DD/MM/YYYY"
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Конечная дата"
                                    value={endValue}
                                    onChange={(newValue) => {
                                        setEndValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                    inputFormat="DD/MM/YYYY"
                                />
                            </LocalizationProvider>
                        </div>
                        <Button style={{marginTop: "10px", alignSelf:"center"}}
                                onClick={event => {
                                    event.preventDefault()
                                    let params = ''
                                    if (filtersStatuses.length) params += `&statuses=${filtersStatuses.join(',')}`
                                    if (startValue) params += `&start_date=${new Date(startValue.$d).toISOString()}`
                                    if (endValue) params += `&end_date=${new Date(endValue.$d).toISOString()}`
                                    if (params !== '') {
                                        console.log('fetching with params...')
                                        dispatch(fetchUserOrders(true, params))
                                    }
                                }
                            }
                        >
                            Применить
                        </Button>
                    </div>

                    <div style={{textAlign: "center",marginTop:"20px"}}>Заказы</div>

                    {loadingStatus ? undefined :
                        <div className={"container"}>
                            {userOrders.length === 0 ? <div>Пока нет заказов!</div>:
                                <Row xs={1} md={1} sm={1} lg={1} className="grid">
                                    {userOrders.map((item, index) => {
                                        return(
                                            <Col key={index}>
                                                <OrderCard is_manager={user_is_manager()}
                                                           order={item}
                                                           manager_page={true}
                                                           statuses={orderStatuses}/>
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

export default ManagerOrders