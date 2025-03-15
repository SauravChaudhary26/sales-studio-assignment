import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./App.css";

function App() {
   const [coupon, setCoupon] = useState(null);
   const [message, setMessage] = useState(null);
   const [isClaiming, setIsClaiming] = useState(false);

   const claimCoupon = async () => {
      setIsClaiming(true);
      setCoupon(null);
      setMessage(null);
      try {
         const response = await axios.post(
            "https://sales-studio-assignment.onrender.com/claim",
            {}
         );
         setCoupon(response.data.coupon);
         setMessage(response.data.message);
      } catch (error) {
         setMessage(error.response?.data?.message || "An error occurred.");
      } finally {
         setIsClaiming(false);
      }
   };

   return (
      <div className="container">
         <h1>Round-Robin Coupon Distribution</h1>
         <button onClick={claimCoupon} className="claim-button">
            Claim Coupon
         </button>
         {isClaiming && (
            <div className="spinner-container">
               <div className="spinner"></div>
               <span>Claiming coupon...</span>
            </div>
         )}
         {coupon && <p className="success-message">Your Coupon: {coupon}</p>}
         {message && !isClaiming && <p className="error-message">{message}</p>}
      </div>
   );
}

export default App;
