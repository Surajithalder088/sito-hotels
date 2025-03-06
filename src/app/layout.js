"use client"
import Navbar from "./{component}/Navbar/page";

import  { Metadata } from "next";
import { Provider } from "react-redux";
import { store } from "@/lib/store/store";
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"

const stripe_publishable_key="pk_test_51Qycsc2fvWXfpS0a9f5dW4wp8Vr0fLjQM17BwjpuA4EaFW4EfkcOxFCBWWPIC2LgeMmnLtDx0trOYrlnF5YnApaX00KhObaB56"

const stripePromise=loadStripe(stripe_publishable_key)


export default function RootLayout({ children }) {
  return (
    <html lang="en">
     

      <body
       
      >
        <Provider store={store}>
 <Elements stripe={stripePromise}>
        {children}
        </Elements>
        </Provider>
      
      </body>
    </html>
  );
}
