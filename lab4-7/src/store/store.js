import {configureStore} from "@reduxjs/toolkit";
import * as StartPageMiddlewares from "./middlewares/StartPageMiddlewares";
import fetchMangaInfo from "./middlewares/MangaPageMiddlewares";
import {fetchUserCart, fetchUserOrders} from "./middlewares/AppMiddlewares";
import rootReducer from "./reducers/RootReducer";


const myMiddlewares = [
    StartPageMiddlewares.fetchStartPageData,
    StartPageMiddlewares.fetchMangaList,
    fetchMangaInfo,
    fetchUserCart,
    fetchUserOrders,
]

const store = configureStore({
    reducer: rootReducer,
    myMiddlewares
})

export default store