import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import StartPage from "./pages/StartPage";
import MangaPage from "./pages/MangaPage";
import "./App.css";
import BasicBreadcrumbs from "./components/Breadcrumbs";
import React from "react";

function App() {

    return (
        <BrowserRouter basename="/" >
            <div className={"web-service-title"}>Manga WebStore</div>
            <div className={"site-navigator"}>
                <ul className={"list-of-links"}>
                    <li>
                        <Link to={"/"}>
                            <p>Стартовая страница</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/manga'}>
                            <p>Вся манга здесь!</p>
                        </Link>
                    </li>
                    <li>
                        <a href={"https://github.com/DSmyslov/MangaStore_WebService"}
                           target={"_blank"} rel={"noreferrer"}>
                            <p>GitHub</p>
                        </a>
                    </li>
                </ul>
            </div>
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

                <Route exact path={'/manga'}>
                    <StartPage />
                </Route>

                <Route exact path={'/manga/:id_manga'} children={<MangaPage />}>
                </Route>

            </Switch>
        </BrowserRouter>
    );
}

export default App;