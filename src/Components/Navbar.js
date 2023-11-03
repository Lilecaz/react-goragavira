import '../styles/NavBar.css'
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from './CardContext';


const Navbar = () => {
    const { isLoggedIn } = React.useContext(CartContext);
    const username = localStorage.getItem('username');
    return (
        <>
            <div className='nav-title'>
                <Link to="/">Govagavira</Link>
            </div>
            <nav>
                <ul className='nav-links'>

                    <li className='nav-link'>
                        <FontAwesomeIcon icon={faHome} /><Link to="/">Accueil</Link>
                    </li>
                    <li className='nav-link'>
                        <Link to="/boutique">Boutique</Link>
                    </li>
                    <li className='nav-link right'>
                        <Link to="/panier"><FontAwesomeIcon icon={faShoppingCart} />Panier</Link>
                    </li>
                    {isLoggedIn ? (
                        <li className='nav-link'>
                            <Link to="/login">{username}</Link>
                        </li>
                    ) : (
                        <li className='nav-link'>
                            <Link to="/login">Se connecter</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </>

    );
};

export default Navbar;
