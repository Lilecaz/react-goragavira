import '../styles/NavBar.css'
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faShoppingCart } from '@fortawesome/free-solid-svg-icons'


const Navbar = () => {
    return (
        <nav>
            <ul className='nav-links'>
                <li className='nav-link'>
                    <FontAwesomeIcon icon={faHome} /><Link to="/">Accueil</Link>
                </li>
                <li className='nav-link'>
                    <Link to="/boutique">Boutique</Link>
                </li>
                {/* <li className='nav-link'>
                    <Link to="/produit">Produit</Link>
                </li> */}
                {/* <li className='nav-link'>
                    <Link to="/commande">Commande</Link>
                </li> */}
                <li className='nav-link right'>
                    <Link to="/panier"><FontAwesomeIcon icon={faShoppingCart} />Panier</Link>
                </li>
                <li className='nav-link'>
                    <Link to="/login">Se connecter</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
