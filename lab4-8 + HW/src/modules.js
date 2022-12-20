import {createAction_setUserManagerStatus} from "./store/actionCreators/AppActionsCreators";
import api_socket from "./network";

export const getMangaList = async () => {
    return await fetch(`http://${api_socket}/manga/`, {credentials: "include"})
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        });
}

export const getAuthorsOfManga = async (manga_id) => {
    return await fetch(`http://${api_socket}/manga/${manga_id}/authors/`, {credentials: "include"})
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        })
}

export const getGenresOfManga = async (manga_id) => {
    return await fetch(`http://${api_socket}/manga/${manga_id}/genres/`, {credentials: "include"})
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        })
}

export const getMangaListFiltered = async (name, max_cost, min_cost) => {
    return await fetch(`http://${api_socket}/manga/?name=${name}&max_cost=${max_cost}&min_cost=${min_cost}`, {credentials: "include"})
        .then(async (response) => {
            return await (await response.json());
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        })
}

export const getMangaById = async (id=-1) => {
    return await fetch(`http://${api_socket}/manga/${id}/`, {credentials: "include"})
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        })
}

export const getMangaPricing = async () => {
    return await fetch(`http://${api_socket}/mangaPricing/`, {credentials: "include"})
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        })
}

export const getCurrentCart = async () => {
    return await fetch(`http://${api_socket}/current_cart/`, {
        credentials: "include"
    }).then(async response => {
        return await response.json();
    }).catch(() => {
        return{
            resultCount: 0,
            results: []
        }
    })
}

export const getUserOrders = async (all = false, params) => {
    let url = `http://${api_socket}/orders/`
    if (all) url = url + `?all=${true}`
    if (params) url += params
    return await fetch(url, {
        credentials: "include",
    }).then(async response => {
        return await response.json();
    }).catch(() => {
        return {
            resultCount: 0,
            results: []
        }
    })
}

export const user_is_manager = () => {
    const is_manager = document.cookie
        .split('; ')
        .filter(row => row.startsWith('is_manager='))
        .map(c=>c.split('=')[1])[0]
    return is_manager === 'True'
}

export const getOrderStatuses = async () => {
    return await fetch(`http://${api_socket}/order_status/`, {credentials: "include"})
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        })
}

export const getTitles = async () => {
    return await fetch(`http://${api_socket}/titles/`, {credentials: "include"})
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        })
}

export const getMediaTypes = async () => {
    return await fetch(`http://${api_socket}/manga_media_type/`, {credentials: "include"})
        .then(async (response) => {
            return await response.json();
        })
        .catch(() => {
            return {
                resultCount: 0,
                results: []
            }
        })
}