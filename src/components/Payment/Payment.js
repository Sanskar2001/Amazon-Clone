import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from "../ContextApi/StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../ContextApi/reducer";
import axios from './axios';
import { collection, addDoc,serverTimestamp  } from "firebase/firestore"
import {db} from "../../Firebase/firebase"
import CountryDropdown from 'country-dropdown-with-flags-for-react';  

function Payment() {
   
    const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");

    // useEffect(() => {
    //     // generate the special stripe secret which allows us to charge a customer
    //     const getClientSecret = async () => {
    //         const response = await axios({
    //             method: 'post',
    //             // Stripe expects the total in a currencies subunits
    //             url: `/payments/create?total=${getBasketTotal(basket) * 100}`
    //         });
    //         setClientSecret(response.data.clientSecret)
    //     }

    //     getClientSecret();
    // }, [basket])

    // console.log('THE SECRET IS >>>', clientSecret)
    // console.log('👱', user)

    const handleSubmit =  (event) => {
        // do all the fancy stripe stuff...
        // event.preventDefault();
        // setProcessing(true);

        // const payload = await stripe.confirmCardPayment(clientSecret, {
        //     payment_method: {
        //         card: elements.getElement(CardElement)
        //     }
        // }).then(({ paymentIntent }) => {
        //     // paymentIntent = payment confirmation

        //     db
        //       .collection('users')
        //       .doc(user?.uid)
        //       .collection('orders')
        //       .doc(paymentIntent.id)
        //       .set({
        //           basket: basket,
        //           amount: paymentIntent.amount,
        //           created: paymentIntent.created
        //       })

        //     setSucceeded(true);
        //     setError(null)
        //     setProcessing(false)

        //     dispatch({
        //         type: 'EMPTY_BASKET'
        //     })
        //       console('paid successfully')
        //     navigate('/')
        // })
        // setTimeout(() => {
        //     navigate('/')

        // }, 2000);
        // const docRef =  addDoc(collection(db, "cities"), {
        //     name: "Tokyo",
        //     country: "Japan"
        //   });
      
        var orders=[]
         var title,image,price;
        basket.map(item => (
          
             
             title=item.title,
               image=item.image,
               price=item.price,
              orders.push({title,price,image})

              
         
          ))
        const docRef =  addDoc(collection(db, "orders"), {
           basket:orders,
           user:user.email,
           time:serverTimestamp()
          }).then(()=>{
              console.log("payment verified")
            
          });
          console.log("Document written with ID: ", docRef.id);
          
          navigate('/orders')
          
     
    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }
    const handleSelect = (country) => {
        console.log(country)
        
      }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                        )
                </h1>


                {/* Payment section - delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <h3>Address Line 1</h3>
                        <textarea className="deliveryAddressText" ></textarea>
                        <h3>Address Line 2</h3>
                        <textarea className="deliveryAddressText"></textarea>
                        <h3>City</h3>
                        <textarea className="deliveryAddressText" ></textarea>
                        <h3>Country</h3>
                        <CountryDropdown  id="UNIQUE_ID" className='countryPicker' preferredCountries={['gb', 'us']}  value="" handleChange={e => console.log(e.target.value)}></CountryDropdown>
                        <h3>Zip Code</h3>
                        <textarea className="deliveryAddressText"></textarea>
                      
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
            

                {/* Payment section - Payment method */}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                         

                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>

                                <div className='payment__priceContainer'>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                    <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                                </div>

                                  {/* Errors */}
                                {error && <div>{error}</div>}
                            </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment