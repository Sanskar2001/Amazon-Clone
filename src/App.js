import React,{useEffect} from 'react';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Comp from './components/comp/Comp'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Checkout from './components/Checkout/Checkout';
import Login from './components/Login/Login';
import Payment from './components/Payment/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import Orders from './components/Orders/Orders';
import {useStateValue} from "./components/ContextApi/StateProvider"
import {auth} from "./Firebase/firebase"
function App() {
  const promise = loadStripe(
    "pk_test_51HPvU9DFg5koCdLGJJbNo60QAU99BejacsvnKvT8xnCu1wFLCuQP3WBArscK3RvSQmSIB3N0Pbsc7TtbQiJ1vaOi00X9sIbazL"
  );
  
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: {name:authUser.email.split('@')[0],email:authUser.email},
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: {name:"Guest",email:""},
        });
      }
    });
  }, []);



  return (
    <>
    
   <BrowserRouter>
  
    <Routes>
   
      <Route path="/" element={<> <Header/> <Home /></>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/d" element={< Comp/>} />
      <Route path="/checkout" element={<> <Header/> < Checkout/> </>} />
     
      <Route path="/payment" element={<> <Header/> <Elements stripe={promise}> <Payment/></Elements> </>} />
      <Route path="/orders" element={<> <Header/> <Orders/> </>}></Route>
     
    </Routes>
  </BrowserRouter>
   </>

  );
}

export default App;
