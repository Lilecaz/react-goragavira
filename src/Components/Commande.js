import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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
        alert(`Merci, votre paiement par carte ${response.data}`);
        const orderData = {
          payment_method: 'card',
          payment_method_title: 'Carte de crédit',
          set_paid: true,
          billing: {
            first_name: creditCardInfo.firstName,
            last_name: creditCardInfo.lastName,
            address_1: creditCardInfo.address1,
            address_2: creditCardInfo.address2,
            city: creditCardInfo.city,
            postcode: creditCardInfo.postalCode,
            country: creditCardInfo.country,
          },
          line_items: cart.map((product) => ({
            product_id: product.id,
            quantity: product.quantity,
          })),
        };
        axios.post('https://eisee-it.o3creative.fr/2023/groupe4/wp-json/wc/v3/orders', orderData, {
          auth: {
            username: 'ck_e30e489bfe9990edb792ce1ad7436620dff7cb29',
            password: 'cs_82c3e0ccfb784baa8052e1edfbc438aa3f3724fc',
          },
        })
          .then(response => {
            alert('Commande envoyée avec succès');
            clearCart();
            navigate('/');

          })
          .catch(error => {
            console.log(error);
            alert('Erreur lors de l\'envoi de la commande');
          });
      })
      .catch(error => {
        console.log(error);
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
                Passer au paiement
              </button>
            </form>
          )}
          {showCreditCardForm && (
            <form onSubmit={handleCreditCardSubmit} className="card-form">
              <input className="card-input" type="text" name="cardNumber" onChange={handleInputChange} placeholder="N° de la carte" required />
              <input className="card-input" type="text" name="expiryDate" onChange={handleInputChange} placeholder="Date expiration" required />
              <input className="card-input" type="text" name="ccv" onChange={handleInputChange} placeholder="CCV" required />
              <input className="card-input" type="text" name="name" onChange={handleInputChange} placeholder="Nom" required />
              <input className="card-input" type="submit" value="Commander" />
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Commande;
