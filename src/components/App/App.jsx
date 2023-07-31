import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home';
import Repo from '../Repo';
import Read from '../Read';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:value" element={<Repo />} />
                <Route path='/:value/:repo' element={<Read />} />
            </Routes>
        </>

    );
}

export default App