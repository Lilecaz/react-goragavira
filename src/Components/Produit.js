
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import '../styles/Produit.css'

import { useContext } from 'react';
import { CartContext } from './CardContext';


const Produit = () => {
    const { addToCart } = useContext(CartContext);
    const { notification } = useContext(CartContext);
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const [produit, setProduit] = useState(null);
    const Carousel = ({ images }) => {
        const [currentImageIndex, setCurrentImageIndex] = useState(0);

        const handlePrevClick = () => {
            setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
        };

        const handleNextClick = () => {
            setCurrentImageIndex((currentImageIndex + 1) % images.length);
        };

        return (
            <div style={{ display: 'flex', alignItems: 'center' }} className='product-image'>
                <div style={{ position: 'relative' }}>
                    <button onClick={handlePrevClick} className='chevrons' style={{ position: 'absolute', left: 0, }}> ← </button>
                    <img src={images[currentImageIndex].woocommerce_single} alt={images[currentImageIndex].name} />
                    <button onClick={handleNextClick} className='chevrons' style={{ position: 'absolute', right: 0 }}>→</button>
                </div>
            </div>
        );
    };
    useEffect(() => {
        axios.get(`https://eisee-it.o3creative.fr/2023/groupe4/wp-json/wc/v3/products/${id}`, {
            auth: {
                username: 'ck_e30e489bfe9990edb792ce1ad7436620dff7cb29',
                password: 'cs_82c3e0ccfb784baa8052e1edfbc438aa3f3724fc'
            }
        })
            .then(response => {
                setProduit(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    if (!produit) {
        return (
            <div className='centered'>
                <FontAwesomeIcon icon={faSpinner} spin />
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div >
            {notification && <div className="notification">{notification}</div>}
            <div style={{ display: 'flex' }} className='product-des'>
                <div style={{ flex: 1 }}>
                    <h1>{produit.name}</h1>
                    <div dangerouslySetInnerHTML={{ __html: produit.description }}></div>
                    {produit.stock_status === "instock" ? <p>Prix : {produit.price} €</p> : <p><b>Rupture de stock</b></p>}
                    <button onClick={() => addToCart(produit)}> Ajouter au panier <FontAwesomeIcon icon={faShoppingCart} className='cart-icon' /></button>
                </div>

                <Carousel images={produit.images} />


            </div>
        </div>
    );
};


export default Produit;
