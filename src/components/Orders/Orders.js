import React, { useState, useEffect } from 'react';
import { db } from "../../Firebase/firebase";
import './Orders.css'
import { useStateValue } from "../ContextApi/StateProvider";
import Order from '../Order/Order'
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { collection,query, where, orderBy, getDocs } from "firebase/firestore";  

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    var title,image,price;
    // if(user.name!='Guest') {
        console.log("Herer")
        // let Product={
          
        //     title:"New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)",
        //     price:598.99,
        //     rating:4,
        //     image:"https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
        //     }
            var myorder=[]
            // myorder.push(Product)
      
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef,where("user","==",user.email),orderBy("time","desc"));
        const querySnapshot =  getDocs(q);
        querySnapshot.then((value)=>{
            value.forEach(item=>{
            
                item.data().basket.forEach((basketarray)=>{
                    //  console.log(basketarray)
                    //  console.log(typeof(basketarray))
                     myorder.push(basketarray)
                     console.log(basketarray)
                   

                //    basketarray.map(item=>{
                //        console.log(item)
                //    })
                    
                //    console.log(orderitem.title)
                })


               
            })
            setOrders(myorder)
        })

        // console.log('\n')
        // console.log(myorder)
        
      
    //    console.log('\n')
    //    console.log(orders)
        
    // } else {
    //     setOrders([])
    // }

  }, [user])

    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className='orders__order'>
            {orders?.map(item => (
                <CheckoutProduct
                    
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    id={item.id}
                   
                />))
                }
            </div>
        </div>
    )
}

export default Orders