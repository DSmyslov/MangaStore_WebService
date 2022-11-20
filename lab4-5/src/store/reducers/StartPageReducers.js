import initialState from "../initialState";
import * as StartPageActions from "../actions/StartPageActions";
import {combineReducers} from "@reduxjs/toolkit";

function textFieldValueReducer(state = initialState.ui.StartPage.textFieldValue, action) {
    switch (action.type) {
        case StartPageActions.setTextFieldValue:
            return action.value
        default: return state
    }
}

function sliderValueReducer(state = initialState.ui.StartPage.sliderValue, action) {
    switch (action.type) {
        case StartPageActions.setSliderValue:
            return action.value
        default: return state
    }
}

function mangaPricingReducer(state = initialState.cached_data.StartPage.mangaPricing, action) {
    switch (action.type) {
        case StartPageActions.setMangaPricing:
            return action.value
        default: return state
    }
}

function mangaListReducer(state = initialState.cached_data.StartPage.mangaList, action) {
    switch (action.type) {
        case StartPageActions.setMangaList:
            return action.value
        default: return state
    }
}

function loadingStatusReducer(state = initialState.ui.StartPage.loadingStatus, action) {
    switch (action.type) {
        case StartPageActions.setLoadingStatus:
            return action.value
        default: return state
    }
}

export const uiStartPageReducers = combineReducers({
    loadingStatus: loadingStatusReducer,
    textFieldValue: textFieldValueReducer,
    sliderValue: sliderValueReducer,
})

export const cached_dataStartPageReducers = combineReducers({
    mangaList: mangaListReducer,
    mangaPricing: mangaPricingReducer
})