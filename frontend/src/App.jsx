import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage, { productLoader } from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import CheckoutPage from "./pages/CheckoutPage";
import ViewPage from "./pages/ViewPage";
import CompletePage from "./pages/CompletePage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import { loadStripe } from "@stripe/stripe-js";
import SoldOutPage from "./pages/SoldOutPage";
import { CartProvider } from "./contexts/CartContext";
import CartPage from "./pages/CartPage";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="view/:id" element={<ViewPage />} loader={productLoader} />
        <Route
          path="checkout"
          element={<CheckoutPage stripePromise={stripePromise} />}
        />
        <Route
          path="soldout/:id"
          element={<SoldOutPage />}
          loader={productLoader}
        />
        <Route path="cart" element={<CartPage />} />
        <Route path="complete" element={<CompletePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
};

export default App;
