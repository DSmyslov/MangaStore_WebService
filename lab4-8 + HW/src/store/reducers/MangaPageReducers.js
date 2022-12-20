import initialState from "../initialState";
import * as MangaPageActions from "../actions/MangaPageActions";
import {combineReducers} from "@reduxjs/toolkit";


function genresOfMangaReducer(state = initialState.cached_data.MangaPage.genresOfManga, action) {
    switch (action.type) {
        case MangaPageActions.setGenres:
            return action.value
        default: return state
    }
}

function authorsOfMangaReducer(state = initialState.cached_data.MangaPage.authorsOfManga, action) {
    switch (action.type) {
        case MangaPageActions.setAuthors:
            return action.value
        default: return state
    }
}

function mangaByIdReducer(state = initialState.cached_data.MangaPage.mangaById, action) {
    switch (action.type) {
        case MangaPageActions.setManga:
            return action.value
        default: return state
    }
}

function loadingStatusReducer(state = initialState.ui.MangaPage.loadingStatus, action) {
    switch (action.type) {
        case MangaPageActions.setLoadingStatus:
            return action.value
        default: return state
    }
}

export const cached_dataMangaPageReducers = combineReducers({
    genresOfManga: genresOfMangaReducer,
    authorsOfManga: authorsOfMangaReducer,
    mangaById: mangaByIdReducer,
})

export const uiMangaPageReducers = combineReducers({
    loadingStatus: loadingStatusReducer,
})