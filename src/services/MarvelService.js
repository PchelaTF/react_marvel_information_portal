import { useHttp } from "../hooks/http.hooks"

const useMarvelService = () => {
    const { loading, request, error, clearError, process, setProcess } = useHttp()

    const _APIBase = 'https://gateway.marvel.com:443/v1/public/'
    const _APIKey = 'apikey=e2f3a22aabf77e8bf81d8a333c2c91d8'
    const _baseOffset = 210

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_APIBase}characters?limit=9&offset=${offset}&${_APIKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_APIBase}characters/${id}?${_APIKey}`)
        return _transformCharacter(res.data.results[0])
    }

    const getCharacterByName = async (charName) => {
        const res = await request(`${_APIBase}characters?name=${charName}&${_APIKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_APIBase}comics?limit=8&offset=${offset}&${_APIKey}`)
        return res.data.results.map(_transformComics)
    }

    const getComics = async (id) => {
        const res = await request(`${_APIBase}comics/${id}?${_APIKey}`)
        return _transformComics(res.data.results[0])
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices.price ? `${comics.prices.price}&` : 'NOT AVAILABLE',
            description: comics.description ? comics.description : 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} pages` : 'No information about the numbers of pages',
            language: comics.textObjects.language ? comics.textObjects.language : 'EN-US'
        }
    }

    return {
        loading,
        error,
        process,
        setProcess,
        getAllCharacters,
        getCharacter,
        getCharacterByName,
        clearError,
        getAllComics,
        getComics,
    }
}

export default useMarvelService