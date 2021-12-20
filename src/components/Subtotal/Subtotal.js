import React from "react";
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../ContextApi/StateProvider";
import { getBasketTotal } from "../ContextApi/reducer";
import { Link, useNavigate } from "react-router-dom";
function Subtotal() {
  
  const navigate = useNavigate();

function checkoutPressed() {
  navigate('/payment')
  
}

  const [{ basket }, dispatch] = useStateValue();
     console.log(getBasketTotal(basket))
    return (
      <div className="subtotal">
        <CurrencyFormat
          renderText={(value) => (
            <>
              <p>
                
                Subtotal ({basket?.length} items): <strong>{getBasketTotal(basket)}</strong>
              </p>
              <small className="subtotal__gift">
                <input type="checkbox" /> This order contains a gift
              </small>
            </>
          )}
          decimalScale={2}
          value={200} 
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
  
        <button onClick={checkoutPressed}>Proceed to Checkout</button>
      </div>
    );
  }
  
  export default Subtotal;