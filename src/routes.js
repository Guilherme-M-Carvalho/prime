import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import Filmes from './pages/Filmes';
import Header from './components/header';
import Error from './pages/error';
import Favoritos from './pages/Favoritos';

export default function RoutesApp(){
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/filme/:id' element={<Filmes />}/>
                <Route path='/favoritos' element={ <Favoritos />} />

                <Route path='*' element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}