export const getMangaList = async () => {
    return await fetch(`http://localhost:8000/manga/`)
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
    return await fetch(`http://localhost:8000/manga/${manga_id}/authors/`)
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
    return await fetch(`http://localhost:8000/manga/${manga_id}/genres/`)
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

export const getMangaByName = async (search_value) => {
    return await fetch(`http://localhost:8000/manga/?name=${search_value}`)
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
    return await fetch(`http://localhost:8000/manga/${id}/`)
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
