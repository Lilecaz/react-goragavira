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
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const navigate = useNavigate();

  const handleBillingInputChange = (event) => {
    setBillingInfo({
      ...billingInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleValidateOrder = () => {
    if (!showForm) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };
  const handleCreditCardSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5001/validate-card', creditCardInfo)
      .then(response => {
        if (response.data.valid) {
          alert(`Merci, votre paiement par carte ${response.data.cardNumber} avec type ${response.data.cardType} a été validé.`);
          const orderData = {
            payment_method: 'card',
            payment_method_title: 'Carte de crédit',
            set_paid: true,
            billing: {
              first_name: billingInfo.firstName,
              last_name: billingInfo.lastName,
              address_1: billingInfo.address1,
              address_2: billingInfo.address2,
              city: billingInfo.city,
              postcode: billingInfo.postalCode,
              country: billingInfo.country,
            },
            shipping: {
              first_name: billingInfo.firstName,
              last_name: billingInfo.lastName,
              address_1: billingInfo.address1,
              address_2: billingInfo.address2,
              city: billingInfo.city,
              postcode: billingInfo.postalCode,
              country: billingInfo.country,
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
        } else {
          alert('Erreur lors de la validation de la carte');
        }
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
              <input type="text" id="firstName" name="firstName" onChange={handleBillingInputChange} required />

              <label htmlFor="lastName">Nom :</label>
              <input type="text" id="lastName" name="lastName" onChange={handleBillingInputChange} required />

              <label htmlFor="address1">Ligne adresse 1 :</label>
              <input type="text" id="address1" name="address1" onChange={handleBillingInputChange} required />

              <label htmlFor="address2">Ligne adresse 2 :</label>
              <input type="text" id="address2" name="address2" onChange={handleBillingInputChange} />

              <label htmlFor="city">Ville :</label>
              <input type="text" id="city" name="city" onChange={handleBillingInputChange} required />

              <label htmlFor="postalCode">Code postal :</label>
              <input type="text" id="postalCode" name="postalCode" onChange={handleBillingInputChange} required />

              <label htmlFor="country">Pays :</label>
              <input type="text" id="country" name="country" onChange={handleBillingInputChange} required />

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
