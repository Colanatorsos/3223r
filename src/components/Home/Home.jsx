import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [value, setValue] = useState('');

    const valueChange = (e) => {
        setValue(e.target.value);
    };

    const searchSub = (e) => {
        e.preventDefault();
        navigate(`/${value}`);
    };

    const navigate = useNavigate();

    return (
        <>

            <form onSubmit={searchSub}>
                <input
                    placeholder='Введите имя пользователя'
                    style={{ borderRadius: '20px', padding: '10px', border: '0px', outline: 'none' }}
                    id='input'
                    type='text'
                    value={value}
                    onChange={valueChange}
                />
                <button
                    style={{ borderRadius: '10px', border: '1px solid black', backgroundColor: 'white' }}
                    type='submit'
                    id='search'
                >
                    Искать
                </button>
            </form>
        </>
    );
};

export default Home;
