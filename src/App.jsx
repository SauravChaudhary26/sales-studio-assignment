import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function App() {
   const [coupon, setCoupon] = useState(null);
   const [message, setMessage] = useState(null);

   const claimCoupon = async () => {
      try {
         const response = await axios.post(
            "https://sales-studio-assignment.onrender.com/claim",
            {}
         );
         setCoupon(response.data.coupon);
         setMessage(response.data.message);
      } catch (error) {
         setMessage(error.response?.data?.message || "An error occurred.");
      }
   };

   return (
      <div className="min-h-screen flex flex-col items-center justify-center  bg-gray-900 text-white outer">
         <h1 className="text-2xl font-bold mb-4">
            Round-Robin Coupon Distribution
         </h1>
         <button
            onClick={claimCoupon}
            className="px-4 py-2 bg-blue-500 rounded-lg"
         >
            Claim Coupon
         </button>
         {coupon && (
            <p className="mt-4 text-green-400">Your Coupon: {coupon}</p>
         )}
         {message && <p className="mt-2 text-red-400">{message}</p>}
      </div>
   );
}

export default App;
