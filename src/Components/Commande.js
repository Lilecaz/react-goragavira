import React, { useContext, useState } from "react";
import { CartContext } from "./CardContext";
import axios from 'axios';
import "../styles/Commande.css";

const Commande = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [showForm, setShowForm] = useState(false);
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    ccv: '',
    name: '',
  });

  const handleValidateOrder = () => {
    if (!showForm) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };
  const handleCreditCardSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5000/validate-card', creditCardInfo)
      .then(response => {
        alert(`Merci, votre paiement par carte ${response.data.cardType} est validé!`);
        // Enregistrez la commande dans votre back-office ici
      })
      .catch(error => {
        alert('Erreur lors de la validation de la carte');
      });
  };
  const handleInputChange = (event) => {
    setCreditCardInfo({
      ...creditCardInfo,
      [event.target.name]: event.target.value,
    });
  };

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
          <button onClick={clearCart}>Vider le panier</button>
          {" "}
          <button onClick={handleValidateOrder}>Valider la Commande</button>
          {showForm && (
            <form className="ship-form">
              <label htmlFor="firstName">Prénom :</label>
              <input type="text" id="firstName" name="firstName" required />

              <label htmlFor="lastName">Nom :</label>
              <input type="text" id="lastName" name="lastName" required />

              <label htmlFor="address1">Ligne adresse 1 :</label>
              <input type="text" id="address1" name="address1" required />

              <label htmlFor="address2">Ligne adresse 2 :</label>
              <input type="text" id="address2" name="address2" />

              <label htmlFor="city">Ville :</label>
              <input type="text" id="city" name="city" required />

              <label htmlFor="postalCode">Code postal :</label>
              <input type="text" id="postalCode" name="postalCode" required />

              <label htmlFor="country">Pays :</label>
              <input type="text" id="country" name="country" required />

              <button type="button" onClick={() => setShowCreditCardForm(true)}>
                Passer à la paiement
              </button>
            </form>
          )}
          {showCreditCardForm && (
            <form onSubmit={handleCreditCardSubmit}>
              <input type="text" name="cardNumber" onChange={handleInputChange} placeholder="N° de la carte" required />
              <input type="text" name="expiryDate" onChange={handleInputChange} placeholder="Date expiration" required />
              <input type="text" name="ccv" onChange={handleInputChange} placeholder="CCV" required />
              <input type="text" name="name" onChange={handleInputChange} placeholder="Nom" required />
              <input type="submit" value="Commander" />
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Commande;
