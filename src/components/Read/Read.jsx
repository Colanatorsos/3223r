import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Read = () => {
    const { value, repo } = useParams();
    const [repository, setRepository] = useState({});
    const [readme, setReadme] = useState('');

    // useEffect(() => {
    //     axios(`https://api.github.com/repos/${value}/${repo}`)
    //         .then(({ data }) => {
    //             setRepository(data);
    //             setError(null);
    //         })

    //     axios(`https://raw.githubusercontent.com/${value}/${repo}/master/README.md`)
    //         .then(({ data }) => setReadme(data))
    // }, [value, repo]);
    useEffect(() => {
        Promise.all([
            axios(`https://api.github.com/repos/${value}/${repo}`),
            axios(`https://raw.githubusercontent.com/${value}/${repo}/master/README.md`)
        ])
            .then(([repoResponse, readmeResponse]) => {
                setRepository(repoResponse.data);
                setReadme(readmeResponse.data);
                setError(null);
            })
            .catch((er) => {
                setError('Произошла ошибка при получении данных');
            });
    }, [value, repo]);
    // Написал крч два варианта аксинга, первый практичный, второй красивый

    const navigate = useNavigate();

    const goHome = (e) => {
        e.preventDefault();
        navigate(`/`);
    };


    return (
        <div>
            <button onClick={goHome}>Домой</button>
            <br />
            <br />
            <h2>Репозиторий: {repo}</h2>
            <h3>Описание: {repository.description || 'Нет описания'}</h3>
            <div>
                <h3>Содержимое файла README.md:</h3>
                <ReactMarkdown>{readme}</ReactMarkdown>
            </div>
        </div>
    );
};

export default Read;
