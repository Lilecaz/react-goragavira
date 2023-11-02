import React, { useContext } from "react";
import { CartContext } from "./CardContext";
import "../styles/Panier.css";
import { Link } from "react-router-dom";

function Panier() {
  const { cart, removeFromCart } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="Panier">
        <h2>Panier</h2>
        <p>Votre panier est vide</p>
      </div>
    );
  }

  return (
    <div className="Panier">
      <h2>Panier</h2>
      <div className="product-container">
        {cart.map((product) => (
          <div className="product" key={product.id}>
            <div className="product-img">
              <Link to={`/produit?id=${product.id}`}>
                <img
                  src={product.images[0].woocommerce_thumbnail}
                  alt={product.images[0].alt}
                />
              </Link>
            </div>
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">Prix : {product.price} €</p>
            <div className="product-rmv">
              <button onClick={() => removeFromCart(product)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Panier;
