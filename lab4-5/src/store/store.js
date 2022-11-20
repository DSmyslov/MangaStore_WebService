import {configureStore} from "@reduxjs/toolkit";
import * as StartPageMiddlewares from "./middlewares/StartPageMiddlewares";
import fetchMangaInfo from "./middlewares/MangaPageMiddlewares";
import rootReducer from "./reducers/RootReducer";


const myMiddlewares = [
    StartPageMiddlewares.fetchFullInfo,
    StartPageMiddlewares.fetchMangaList,
    fetchMangaInfo
]

const store = configureStore({
    reducer: rootReducer,
    myMiddlewares
})

export default store