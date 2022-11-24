import {combineReducers} from "@reduxjs/toolkit";
import { uiStartPageReducers, cached_dataStartPageReducers } from "./StartPageReducers";
import { uiMangaPageReducers, cached_dataMangaPageReducers } from "./MangaPageReducers";
import { uiAppReducers, cached_dataAppReducers } from "../reducers/AppReducers";


const rootReducer = combineReducers({
    cached_data: combineReducers({
        StartPage: cached_dataStartPageReducers,
        MangaPage: cached_dataMangaPageReducers,
        App: cached_dataAppReducers,
    }),
    ui: combineReducers({
        StartPage: uiStartPageReducers,
        MangaPage: uiMangaPageReducers,
        App: uiAppReducers,
    }),
})

export default rootReducer