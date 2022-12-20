import { BrowserRouter, Route, Switch } from "react-router-dom";
import StartPage from "./pages/StartPage";
import MangaPage from "./pages/MangaPage";
import "./App.css";
import BasicBreadcrumbs from "./components/Breadcrumbs";
import React, {useEffect} from "react";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import UserCartPage from "./pages/UserCartPage";
import UserPurchasesPage from "./pages/UserPurchasesPage";
import SignUp from "./pages/RegPage";
import SignIn from "./pages/AuthPage";
import {useDispatch} from "react-redux";
import {createAction_setUserStatus, createAction_setUserManagerStatus} from "./store/actionCreators/AppActionsCreators";
import {Button} from "react-bootstrap";
import {useHistory} from "react-router";
import ManagerOrders from "./pages/ManagerOrders";
import ManagerManga from "./pages/ManagerManga";

function App() {

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {

        const is_manager = document.cookie
            .split('; ')
            .filter(row => row.startsWith('is_manager='))
            .map(c=>c.split('=')[1])[0]
        dispatch(createAction_setUserManagerStatus(is_manager === 'True'))

        const is_logged_in = document.cookie
                                        .split('; ')
                                        .filter(row => row.startsWith('is_logged_in='))
                                        .map(c=>c.split('=')[1])[0]
        dispatch(createAction_setUserStatus(is_logged_in === 'True'))

    }, [])

    return (
        <BrowserRouter basename="/" >

            <ResponsiveAppBar />

            <Switch>

                <Route exact path={'/'}>
                    <BasicBreadcrumbs props={[
                        {
                            ref: '/',
                            text: 'Начальная страница'
                        }
                    ]}/>
                    <div className={"navbar"}>Добро пожаловать!</div>
                </Route>

                <Route exact path={'/manga'} children={<StartPage />} />

                <Route exact path={'/manga/:id_manga'} children={<MangaPage />} />

                <Route exact path={'/cart'} children={<UserCartPage />}/>

                <Route exact path={'/purchases'} children={<UserPurchasesPage />}/>

                <Route exact path={'/reg'} children={<SignUp/>}/>

                <Route exact path={'/login'} children={<SignIn/>}/>

                <Route exact path={'/manager'} children={
                    <div className={"container"}
                         style={{justifyContent: "center", gap: "10px", display: "flex", marginTop: "20px"}}>
                        <a href={'/manager_orders'}>
                            <Button>
                                Изменение статусов заказов
                            </Button>
                        </a>
                        <a href={'/manager_manga'}>
                            <Button>Добавление манги</Button>
                        </a>
                    </div>
                }/>

                <Route exact path={'/manager_orders'} children={<ManagerOrders/>}/>

                <Route exact path={'/manager_manga'} children={<ManagerManga/>}/>

            </Switch>
        </BrowserRouter>
    );
}

export default App;