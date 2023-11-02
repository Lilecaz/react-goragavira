import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Boutique.css';
import { useContext } from 'react';
import { CartContext } from './CardContext';
import Cart from './Cart';



const Boutique = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { addToCart } = useContext(CartContext);
    const { notification } = useContext(CartContext);


    useEffect(() => {
        axios.get('https://eisee-it.o3creative.fr/2023/groupe4/wp-json/wc/v3/products?per_page=20', {
            auth: {
                username: 'ck_e30e489bfe9990edb792ce1ad7436620dff7cb29',
                password: 'cs_82c3e0ccfb784baa8052e1edfbc438aa3f3724fc'
            }
        })
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des produits :', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className='centered'>
                <FontAwesomeIcon icon={faSpinner} spin />
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div>
            {notification && <div className="notification">{notification}</div>}
            <Cart />
            <h1>Boutique</h1>

            <div className="grid-container">
                {products.map(product => (
                    <div key={product.id} className="grid-item">
                        <Link to={`/produit?id=${product.id}`}>
                            <h2>{product.name}</h2>
                            <img src={product.images[0].woocommerce_thumbnail} alt={product.images[0].alt} />
                        </Link>

                        {product.stock_status === "instock" ?
                            <div>
                                <p className='product-price'>Prix : {product.price} €</p>
                                <button onClick={() => addToCart(product)}> Ajouter au panier <FontAwesomeIcon icon={faShoppingCart} className='cart-icon' /></button>
                            </div> : <p>Rupture de stock</p>}
                    </div>
                ))}


            </div>
        </div>
    );
};

export default Boutique;