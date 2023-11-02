import React, { useContext } from 'react';
import { CartContext } from './CardContext';
import '../styles/Panier.css';

function Panier() {
    const { cart, removeFromCart } = useContext(CartContext);

    if (cart.length === 0) {
        return (
            <div>
                <h2>Panier</h2>
                <p>Votre panier est vide</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Panier</h2>
            {cart.map(product => (
                <div key={product.id} >
                    <h2>{product.name}</h2>
                    <p>Prix : {product.price} €</p>
                    <div className='product-img'>
                        <img src={product.images[0].woocommerce_gallery_thumbnail} alt={product.images[0].alt} />
                    </div>
                    <div className='product-rmv'>
                        <button onClick={() => removeFromCart(product)}>Supprimer</button>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default Panier;
