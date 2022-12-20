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
        App: {
            userAuthorized: false,
            userIsManager: false,
            orderStatuses: [],
            mangaTitles: [],
            mangaMediaTypes: [],
            userCart: [],
            userOrders: [],
        }
    },
    ui: {
        StartPage: {
            loadingStatus: true,
            textFieldValue: '',
            sliderValue: [0, 0]
        },
        MangaPage: {
            loadingStatus: true,
        },
        CartPage: {
            loadingStatus: true,
        },
        OrdersPage: {
            loadingStatus: true,
        },
        App: {
            AppBarLinks: [
                {
                    title: 'Начальная страница',
                    link: '/'
                },
                {
                    title: 'Список манги',
                    link: '/manga'
                },
            ],
        }
    }
}

export default initialState