import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Boutique.css';
import { useContext } from 'react';
import { CartContext } from './CardContext';
import Cart from './Cart';
import Isotope from 'isotope-layout';

const Boutique = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [filterKey, setFilterKey] = useState('*');

    const { addToCart } = useContext(CartContext);
    const { notification, isInCart } = useContext(CartContext);

    const isotope = useRef(null);

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);

    const handleMinPriceChange = e => setMinPrice(e.target.value);
    const handleMaxPriceChange = e => setMaxPrice(e.target.value);

    const handlePriceFilter = () => {
        if (isotope.current) {
            isotope.current.arrange({
                filter: function (itemElem) {
                    const productPrice = parseFloat(itemElem.getAttribute('data-price'));
                    return productPrice >= minPrice && productPrice <= maxPrice;
                },
            });
        }
    };


    useEffect(() => {
        axios.get('https://eisee-it.o3creative.fr/2023/groupe4/wp-json/wc/v3/products/categories', {
            auth: {
                username: 'ck_e30e489bfe9990edb792ce1ad7436620dff7cb29',
                password: 'cs_82c3e0ccfb784baa8052e1edfbc438aa3f3724fc'
            }
        })
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des catégories :', error);
            });
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

    useEffect(() => {
        if (!loading) {
            isotope.current = new Isotope('.grid-container', {
                itemSelector: '.grid-item',
                layoutMode: 'fitRows',
            });
        }
    }, [loading]);

    useEffect(() => {
        if (isotope.current) {
            filterKey === '*'
                ? isotope.current.arrange({ filter: `*` })
                : isotope.current.arrange({ filter: `.${filterKey}` });
        }
    }, [filterKey]);

    const handleFilterKeyChange = key => () => setFilterKey(key);

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
            {notification && <div className={isInCart ? 'notification error' : 'notification'}>{notification}</div>}
            <Cart />
            <h1>Boutique</h1>

            <div className="filter-buttons">
                <button onClick={handleFilterKeyChange('*')}>Tous</button>
                {categories.map(category => (
                    <button key={category.id} onClick={handleFilterKeyChange(`category-${category.id}`)}>
                        {category.name}
                    </button>
                ))}
                <div className='price-filter'>
                    <input type='number' value={minPrice} onChange={handleMinPriceChange} />
                    <input type='number' value={maxPrice} onChange={handleMaxPriceChange} />
                    <button onClick={handlePriceFilter}>Filtrer par prix</button>
                </div>
            </div>

            <div className="grid-container">
                {products.map(product => (
                    <div
                        key={product.id}
                        className={`grid-item ${product.categories.map(cat => `category-${cat.id}`).join(' ')}`}
                        data-price={parseFloat(product.price) || 0} // Utilise 0 si le prix n'est pas valide
                    >
                        <Link to={`/produit?id=${product.id}`}>
                            <h2>{product.name}</h2>
                            <img src={product.images[0].woocommerce_thumbnail} alt={product.images[0].alt} />
                        </Link>
                        {product.stock_status === "instock" ? (
                            <div>
                                <p className='product-price'>Prix : {product.price} €</p>
                                <button onClick={() => addToCart(product)}>
                                    Ajouter au panier <FontAwesomeIcon icon={faShoppingCart} className='cart-icon' />
                                </button>
                            </div>
                        ) : (
                            <p>Rupture de stock</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Boutique;