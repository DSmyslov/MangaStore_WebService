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
import {createAction_setUserStatus} from "./store/actionCreators/AppActionsCreators";

function App() {

    const dispatch = useDispatch()

    useEffect(() => {

        const is_logged_in = document.cookie
                                        .split('; ')
                                        .filter(row => row.startsWith('is_logged_in='))
                                        .map(c=>c.split('=')[1])[0]
        dispatch(createAction_setUserStatus(is_logged_in !== 'False'))

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

            </Switch>
        </BrowserRouter>
    );
}

export default App;