import * as StartPageActionCreators from "../actionCreators/StartPageActionCreators"
import {getMangaList, getMangaListFiltered, getMangaPricing} from "../../modules";


export const fetchMangaList = (filters) => async dispatch => {
    dispatch(StartPageActionCreators.createAction_setLoadingStatus(true))
    if (filters) {
        const data = await getMangaListFiltered(filters.title, filters.max_cost, filters.min_cost)
        dispatch(StartPageActionCreators.createAction_setMangaList(data))
        dispatch(StartPageActionCreators.createAction_setLoadingStatus(false))
    }
    else {
        const data = await getMangaList()
        dispatch(StartPageActionCreators.createAction_setMangaList(data))
        dispatch(StartPageActionCreators.createAction_setLoadingStatus(false))
    }
}

export const fetchStartPageData = () => async dispatch => {
    dispatch(StartPageActionCreators.createAction_setLoadingStatus(true))
    const mangaList = await getMangaList()
    const data = await getMangaPricing()
    const pricingInfo = [data.min_price || 0, data.max_price || 0]
    dispatch(StartPageActionCreators.createAction_setMangaList(mangaList))
    dispatch(StartPageActionCreators.createAction_setMangaPricing(pricingInfo))
    dispatch(StartPageActionCreators.createAction_setLoadingStatus(false))
}