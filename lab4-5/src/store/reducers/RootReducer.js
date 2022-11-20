import {combineReducers} from "@reduxjs/toolkit";
import { uiStartPageReducers, cached_dataStartPageReducers } from "./StartPageReducers";
import { uiMangaPageReducers, cached_dataMangaPageReducers } from "./MangaPageReducers";


const rootReducer = combineReducers({
    cached_data: combineReducers({
        StartPage: cached_dataStartPageReducers,
        MangaPage: cached_dataMangaPageReducers,
    }),
    ui: combineReducers({
        StartPage: uiStartPageReducers,
        MangaPage: uiMangaPageReducers,
    }),
})

export default rootReducer