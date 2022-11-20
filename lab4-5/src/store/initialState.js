const initialState = {
    cached_data: {
        StartPage: {
            mangaList: [],
            mangaPricing: [0, 0],
        },
        MangaPage: {
            genresOfManga: [],
            authorsOfManga: [],
            mangaById: {},
        },
    },
    ui: {
        StartPage: {
            loadingStatus: true,
            textFieldValue: '',
            sliderValue: [0, 0]
        },
        MangaPage: {
            loadingStatus: true,
        }
    }
}

export default initialState