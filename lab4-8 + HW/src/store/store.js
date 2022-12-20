import {configureStore} from "@reduxjs/toolkit";
import * as StartPageMiddlewares from "./middlewares/StartPageMiddlewares";
import fetchMangaInfo from "./middlewares/MangaPageMiddlewares";
import {fetchUserCart, fetchUserOrders, fetchOrderStatuses} from "./middlewares/AppMiddlewares";
import rootReducer from "./reducers/RootReducer";


const myMiddlewares = [
    StartPageMiddlewares.fetchStartPageData,
    StartPageMiddlewares.fetchMangaList,
    fetchMangaInfo,
    fetchUserCart,
    fetchUserOrders,
    fetchOrderStatuses
]

const store = configureStore({
    reducer: rootReducer,
    myMiddlewares
})

export default store