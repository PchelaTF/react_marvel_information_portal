import './comicsList.scss';
import React from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom'

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner />
        case 'success':
            return <Component />
        case 'error':
            return <ErrorMessage />
        default:
            throw new Error('Unexpected process state')
    }
}

const ComicsList = () => {
    const [comicsList, setComicsList] = React.useState([])
    const [offset, setOffset] = React.useState(210)
    const [newItemLoading, setNewItemLoading] = React.useState(false)
    const [comicsEnded, setComicsEnded] = React.useState(false)

    const { loading, error, process, setProcess, getAllComics } = useMarvelService()

    React.useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)

        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('success'))
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false

        if (newComicsList.length < 8) {
            ended = true
        }

        setComicsList([...comicsList, ...newComicsList])
        setOffset(offset + 8)
        setNewItemLoading(false)
        setComicsEnded(ended)
    }

    const renderItems = (comicsList) => {
        const items = comicsList.map((item, i) => {

            return (
                <li className="comics__item" key={i}>
                    <Link to={`${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    // const content = renderItems(comicsList)
    // const errorMessage = error ? <ErrorMessage /> : null
    // const spinner = loading && !newItemLoading ? <Spinner /> : null

    return (
        <div className="comics__list">
            {/* {errorMessage}
            {spinner}
            {content} */}
            {setContent(process, () => renderItems(comicsList), newItemLoading)}
            <button
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={{ display: comicsEnded ? 'none' : 'block' }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;