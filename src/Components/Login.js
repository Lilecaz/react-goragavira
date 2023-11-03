import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CardContext';
import '../styles/Login.css';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setIsLoggedIn, isLoggedIn } = useContext(CartContext);


    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('https://eisee-it.o3creative.fr/2023/groupe4/wp-json/jwt-auth/v1/token', {
            username,
            password,
        })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                setIsLoggedIn(true);
                localStorage.setItem('username', response.data.user_display_name);
                navigate('/boutique');
            })
            .catch(error => {
                alert('Erreur lors de la connexion');
            });
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
    };

    return (
        <div>
            {isLoggedIn ? (
                <div className='login-form'>
                    <p>Vous êtes déjà connecté.</p>
                    <button onClick={handleLogout} className='logout-button'>Se déconnecter</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className='login-form'>
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Identifiant' className='login-input' required />
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Mot de passe' className='login-input' required />
                    <button type='submit' className='login-button'>Se connecter</button>
                </form>
            )}
        </div>

    );
};

export default Login;