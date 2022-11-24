import { BrowserRouter, Route, Switch } from "react-router-dom";
import StartPage from "./pages/StartPage";
import MangaPage from "./pages/MangaPage";
import "./App.css";
import BasicBreadcrumbs from "./components/Breadcrumbs";
import React from "react";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import UserCartPage from "./pages/UserCartPage";
import UserPurchasesPage from "./pages/UserPurchasesPage";

function App() {

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

            </Switch>
        </BrowserRouter>
    );
}

export default App;