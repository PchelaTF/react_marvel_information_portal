import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import setContent from '../../utils/setContent';

const SinglePage = ({ Component, dataType }) => {
    const params = useParams()
    const id = params.id
    const [data, setData] = React.useState(null)

    const { loading, error, process, setProcess, getComics, getCharacter } = useMarvelService()

    React.useEffect(() => {
        updateData()
    }, [params])

    const updateData = () => {
        switch (dataType) {
            case 'comic':
                getComics(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('success'))
                break
            case 'character':
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('success'))
                break
            default:
                break
        }
    }

    const onDataLoaded = (data) => {
        setData(data)
    }

    // const errorMessage = error ? <ErrorMessage /> : null
    // const spinner = loading ? <Spinner /> : null
    // const content = !(loading || error || !data) ? <Component data={data} /> : null

    return (
        <>
            <AppBanner />
            {/* {errorMessage} */}
            {/* {spinner} */}
            {/* {content} */}
            {setContent(process, Component, data)}
        </>
    )
}


export default SinglePage;