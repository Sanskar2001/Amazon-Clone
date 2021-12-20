import React from 'react'
import './Order.css'

import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
//    let Product={
//     id:"3254354345",
//     title:"New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)",
//     price:598.99,
//     rating:4,
//     image:"https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
//     }
//     var myorder=[]
//     myorder.push(Product)
console.log("Inside order")
    console.log(order.length)
    return (
        <div className='order'>
            <h2>Order</h2>
              

             
            {order?.map(item => (
                <CheckoutProduct
                   
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    id={item.id}
                   
                />))
            }
            {/* <CurrencyFormat
                renderText={(value) => (
                    <h3 className="order__total">Order Total: {value}</h3>
                )}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />    */}
        </div>
    )
}

export default Order