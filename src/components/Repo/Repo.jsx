import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const Repo = () => {
    const { value } = useParams();
    const [repos, setRepos] = useState([]);
    const [user, setUser] = useState({});
    const [er, setError] = useState(null);

    useEffect(() => {
        axios(`https://api.github.com/users/${value}/repos`)
            .then(({ data }) => {
                setRepos(data);
                setError(null);
            })
            .catch((er) => {
                setError('Пользователь не найден');
            });

        axios(`https://api.github.com/users/${value}`)
            .then(({ data }) => {
                setUser(data);
            })
    }, [value]);
    // тут через promise all не обязательно, т.к по идее у них нету парралелей выполнения, а значит и смысла нет
    const navigate = useNavigate();

    const goHom = (e) => {
        e.preventDefault();
        navigate(`/`);
    };
    // сначала что бы отобразить catch заюзал if, потом решил просто скобки как логическое наличие, 
    // а потом все же тернарный т.к элементы отображались
    return (
        <div>
            {er ? <div style={{ fontSize: '50px', color: 'red' }}>{er}     <button onClick={goHom}> Домой </button> </div> : (
                <>
                    <button onClick={goHom}> Домой </button>
                    <br />
                    <br />
                    <h2>Никнейм: {value}</h2>
                    <img style={{ width: '100px', height: '100px', borderRadius: '50%' }} src={user.avatar_url} alt="User Avatar" />
                    <h3>Список репозиториев:</h3>
                    {repos.map((repo) => (
                        <div key={repo.id}>
                            <div style={{ fontSize: '29px', color: 'gray' }}>{repo.name}</div>
                            <div> Дата создания: {repo.created_at}</div>
                            <div> Мейн язык: {repo.language}</div>
                            <br />
                            <Link to={`/${value}/${repo.name}`}>Подробнее</Link>
                            <br />
                            <br />
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default Repo;
