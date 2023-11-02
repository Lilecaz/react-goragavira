import { useContext } from 'react';
import { CartContext } from './CardContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faShoppingCart } from '@fortawesome/free-solid-svg-icons'


const Cart = () => {
    const { cart } = useContext(CartContext);

    return (
        <div className="cart">
            <FontAwesomeIcon icon={faShoppingCart} className='cart-icon' />
            {cart.length}
        </div>
    );
};

export default Cart;