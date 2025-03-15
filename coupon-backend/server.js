const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const coupons = [
   "COUPON1",
   "COUPON2",
   "COUPON3",
   "COUPON4",
   "COUPON5",
   "COUPON6",
   "COUPON7",
];
let nextCouponIndex = 0;
const claimedCoupons = {}; // { IP: timestamp }
const COOKIE_NAME = "coupon_claimed";
const CLAIM_COOLDOWN = 30 * 60 * 1000; // 30 minutes cooldown

app.post("/claim", (req, res) => {
   const userIp =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
   const currentTime = Date.now();

   // Check if the user has claimed a coupon recently (via IP)
   if (
      claimedCoupons[userIp] &&
      currentTime - claimedCoupons[userIp] < CLAIM_COOLDOWN
   ) {
      return res
         .status(403)
         .json({ message: "You can claim another coupon after 30 minutes." });
   }

   // Check if the user has a cookie preventing them from claiming
   if (req.cookies[COOKIE_NAME]) {
      return res
         .status(403)
         .json({ message: "You have already claimed a coupon. Try later!" });
   }

   // Assign the next coupon
   const coupon = coupons[nextCouponIndex];
   nextCouponIndex = (nextCouponIndex + 1) % coupons.length; // Round-robin logic

   // Store claim timestamp
   claimedCoupons[userIp] = currentTime;

   // Set a cookie to prevent multiple claims
   res.cookie(COOKIE_NAME, "true", { maxAge: CLAIM_COOLDOWN, httpOnly: true });

   return res.json({ coupon, message: "Coupon claimed successfully!" });
});

app.listen(process.env.PORT, () =>
   console.log(`Server running on port ${process.env.PORT}`)
);
