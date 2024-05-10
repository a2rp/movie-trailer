import React from 'react'
import MovieTrailer from './movieTrailer/MovieTrailer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <div>
            <MovieTrailer />

            <ToastContainer />
        </div>
    )
}

export default App

