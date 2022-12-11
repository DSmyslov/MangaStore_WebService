import { useSelector, useDispatch } from "react-redux";
import {useEffect, useState} from "react";
import {fetchUserOrders} from "../store/middlewares/AppMiddlewares";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


function UserPurchasesPage() {

    const userStatus = useSelector(state => state.cached_data.App.userAuthorized)
    const userOrders = useSelector(state => state.cached_data.App.userOrders)
    const loadingStatus = useSelector(state => state.ui.OrdersPage.loadingStatus)
    const dispatch = useDispatch()

    const [open, setOpen] = useState(new Map());

    useEffect(() => {

        if (userStatus) dispatch(fetchUserOrders())

    }, [userStatus])

    useEffect(() => {

        if (userOrders.length > 0) {
            let new_state = open
            userOrders.forEach((order, index) => {
                new_state.set(index, false)
            })
            setOpen(new_state)
            console.log(open)
        }

    }, [userOrders])

    return (
        <>
            {!userStatus ? <div style={{marginTop: "10px", fontSize: "20px"}}>
                    Пожалуйста, авторизуйтесь для просмотра вашего списка заказов</div>:
                <div style={{marginTop: "10px", fontSize: "20px"}}>
                    <div style={{textAlign: "center"}}>Ваши заказы</div>
                    {loadingStatus ? <></> :
                        <>
                            {userOrders.length === 0 ? <div style={{textAlign: "center"}}>У Вас пока нет заказов!</div>:
                                <>
                                    <List
                                        sx={{bgcolor: 'background.paper'}}
                                        component="nav"
                                        aria-labelledby="nested-list-subheader"
                                    >
                                        {userOrders.map((order, index) => {
                                            return (
                                                <>
                                                    <ListItemButton id={order.id} key={index} onClick={ e => {
                                                        e.preventDefault()
                                                        setOpen(open.set(index, !open.get(index)))
                                                        console.log(open.get(index))
                                                    }}>
                                                        <ListItemText
                                                            primary={`Заказ №${order.id}
                                                            от ${new Date(order.order_date).toLocaleString()}
                                                            общей стоимостью: ${order.order_price_sum} ₽
                                                            статус: ${order.order_statusid.order_status_name}`}
                                                        />
                                                    </ListItemButton>
                                                    <div>
                                                        {order.ordered_manga.map((manga, ind) => {
                                                            return (
                                                                <div style={{display: "flex", marginLeft: '50px',
                                                                    justifyContent:"space-between"}}>
                                                                    <ListItemText
                                                                        primary={`${manga.manga_id.manga_name}`}
                                                                    />
                                                                    <ListItemText
                                                                        primary={`${manga.manga_id.cost} ₽`}
                                                                    />
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </List>
                                </>
                            }
                        </>
                    }
                </div>
            }
        </>
    )
}

export default UserPurchasesPage