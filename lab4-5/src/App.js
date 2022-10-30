import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import StartPage from "./pages/StartPage";
import MangaPage from "./pages/MangaPage";
import "./App.css";

function App() {

    return (
        <BrowserRouter basename="/" >
            <div className={"web-service-title"}>Manga WebStore</div>
            <Switch>

                <Route exact path={'/'}>
                    <div className={"site-navigator"}>
                        <ul className={"list-of-links"}>
                            <li>
                                <Link to={'/manga'}>
                                    <p>Вся манга здесь!</p>
                                </Link>
                            </li>
                            <li>
                                <a href={"https://github.com/DSmyslov/MangaStore_WebService"} target={"_blank"} rel={"noreferrer"}>GitHub</a>
                            </li>
                        </ul>
                    </div>
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