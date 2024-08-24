import React from 'react';
import "./footer.css";
import { Assets } from '../../assets/assets';

export const Footer = () => {
  return (
    <div className='footer' id="footer">
      <div className='footer-content'>
        <div className='footer-content-left'>
          <img src={Assets.logo} alt="logo" className='footer-logo'/>
          {/* <p>Choosing delicious food from a list can be an exciting experience, whether you're dining out, ordering in, or planning a meal at home.</p> */}
        </div>
        <div className='footer-content-center'>
          <h2>Company</h2>
          <ul>
          <li><a href="#delivery">Home</a></li>
          <li><a href="#privacy-policy">About us</a></li>
            <li><a href="#delivery">Delivery</a></li>
            <li><a href="#privacy-policy">Privacy Policy</a></li>
            
          </ul>
        </div>
        <div className='footer-content-right'>
          {/* Add content for the right section if needed */}
          <h2>Contact</h2>
          <ul>
          <li><a href="#delivery">+91 9024755049</a></li>
          <li><a href="#privacy-policy">tastyfood@gmail.com</a></li>
           </ul>
        </div>
      </div>
      <hr />
      <p className='copyright'>
        © 2024 <span className='footer-brand'> Tasty </span> Food . All rights reserved.
      </p>
    </div>
  );
}
