import * as StartPageActions from "../actions/StartPageActions"

export const createAction_setMangaPricing = (value) => {
    return {
        type: StartPageActions.setMangaPricing,
        value: value
    }
}

export const createAction_setSliderValue = (value) => {
    return {
        type: StartPageActions.setSliderValue,
        value: value
    }
}

export const createAction_setTextFieldValue = (value) => {
    return {
        type: StartPageActions.setTextFieldValue,
        value: value
    }
}

export const createAction_setMangaList = (value) => {
    return {
        type: StartPageActions.setMangaList,
        value: value
    }
}

export const createAction_setLoadingStatus = (value) => {
    return {
        type: StartPageActions.setLoadingStatus,
        value: value
    }
}