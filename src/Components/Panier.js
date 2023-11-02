import React, { useContext } from "react";
import { CartContext } from "./CardContext";
import "../styles/Panier.css";
import { Link } from "react-router-dom";

function Panier() {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, product) => sum + parseFloat(product.price), 0);

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
      <div className="total">
        <h2>Total : {total.toFixed(2)} €</h2>
      </div>
      <Link to="/commande">
        <button>Aller à la commande</button>
      </Link>
    </div>
  );
}
export default Panier;