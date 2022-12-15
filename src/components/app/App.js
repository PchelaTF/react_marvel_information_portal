import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AppHeader from "../appHeader/AppHeader";
import SingleComicLayout from '../pages/singleComicLayout/SingleComicLayout';
import SingleCharacterLayout from '../pages/singleCharacterLayout/SingleCharacterLayout';
// import Page404 from '../pages/404';
// import MainPage from "../pages/MainPage";
// import ComicsPage from '../pages/ComicsPage';
// import SingleComicPage from '../pages/SingleComicPage';
import Spinner from '../spinner/Spinner';

const Page404 = React.lazy(() => import('../pages/404'))
const MainPage = React.lazy(() => import('../pages/MainPage'))
const ComicsPage = React.lazy(() => import('../pages/ComicsPage'))
const SinglePage = React.lazy(() => import('../pages/SinglePage'))

const App = () => {
    return (
        <BrowserRouter>
            <div className="app" >
                <AppHeader />
                <main>
                    <React.Suspense fallback={<Spinner />}>
                        <Routes>
                            {/* <Route path={'/'}> - путь основнйо страницы*/}
                            <Route path={'/'} element={<MainPage />} />
                            <Route path={'/comics'}>
                                <Route index element={<ComicsPage />} />
                                <Route path=':id' element={<SinglePage Component={SingleComicLayout} dataType={'comic'} />} />
                            </Route>
                            <Route path='/character/:id' element={<SinglePage Component={SingleCharacterLayout} dataType={'character'} />} />
                            <Route path={'*'} element={<Page404 />} />
                        </Routes>
                    </React.Suspense>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App;