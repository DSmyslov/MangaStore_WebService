import * as MangaPageActionsCreators from "../actionCreators/MangaPageActionCreators"
import { getMangaById, getAuthorsOfManga, getGenresOfManga } from "../../modules";


const fetchMangaInfo = (id) => async dispatch => {
    if (id) {
        dispatch(MangaPageActionsCreators.createAction_setLoadingStatus(true))
        const manga = await getMangaById(id)
        const authors = await getAuthorsOfManga(id)
        const genres = await getGenresOfManga(id)
        dispatch(MangaPageActionsCreators.createAction_setManga(manga))
        dispatch(MangaPageActionsCreators.createAction_setAuthors(authors))
        dispatch(MangaPageActionsCreators.createAction_setGenres(genres))
        dispatch(MangaPageActionsCreators.createAction_setLoadingStatus(false))
    }
}

export default fetchMangaInfo