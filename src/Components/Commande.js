import React, { useContext } from "react";
import { CartContext } from "./CardContext";
import "../styles/Commande.css";

const Commande = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <div className="commande">
      <h2>Votre Commande</h2>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          <ul>
            {cart.map((product) => (
              <li key={product.id}>
                {product.name} - {product.quantity} x {product.price} €
                <button onClick={() => removeFromCart(product)}>Retirer</button>
              </li>
            ))}
          </ul>
          <p>
            Total :{" "}
            {cart.reduce(
              (total, product) => total + parseFloat(product.price),
              0
            )}{" "}
            €
          </p>
          <button onClick={clearCart}>Vider le panier</button>{""}
          <button>Valider la Commande</button>
        </div>
      )}
    </div>
  );
};

export default Commande;
