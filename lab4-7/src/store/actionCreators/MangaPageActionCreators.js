import * as MangaPageAction from "../actions/MangaPageActions";


export const createAction_setLoadingStatus = (value) => {
    return {
        type: MangaPageAction.setLoadingStatus,
        value: value
    }
}

export const createAction_setManga = (value) => {
    return {
        type: MangaPageAction.setManga,
        value: value
    }
}

export const createAction_setAuthors = (value) => {
    return {
        type: MangaPageAction.setAuthors,
        value: value
    }
}

export const createAction_setGenres = (value) => {
    return {
        type: MangaPageAction.setGenres,
        value: value
    }
}