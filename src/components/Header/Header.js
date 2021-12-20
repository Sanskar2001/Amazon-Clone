import React from 'react'
import { useStateValue } from "../ContextApi/StateProvider"
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import './HeaderStyle.css'
import {NavLink} from 'react-router-dom'
import { Link } from "react-router-dom";

export default function Header() {
    

  const [{ basket, user }, dispatch] = useStateValue();
  var signInButton
  if(user.name=="Guest")
  {
     signInButton= <span className="header__optionLineTwo">Sign In</span>
  }
  else
  signInButton=<span className="header__optionLineTwo">Sign Out</span>



  console.log(user.name)

    return(
        <div className='header'>
     


      <Link to ="/">
      <img
          className="header__logo"
          onClick={"/"}
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        /> 
        </Link>
          
        
     
     


       
        <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      


      <div className="header__nav">
       
        <div className="header__option">
          <span className="header__optionLineOne">Hello {user.name}</span>
           <Link to ="/login">
           {signInButton}
           </Link>
          
             {/* <span className="header__optionLineTwo">Sign In</span> */}
          
           
        </div>

      <Link to= "/orders">
       <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
          </Link>
        

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

         <Link to ="/checkout">
        
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
            {basket?.length}
            </span>
          </div>
          </Link>
        </div>
           
       </div>);
}