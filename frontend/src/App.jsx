import React from "react";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import CheckoutPage from "./pages/CheckoutPage";
import ViewPage from "./pages/ViewPage";
import CompletePage from "./pages/CompletePage";
import { loadStripe } from "@stripe/stripe-js";

const App = () => {
  const stripePromise = loadStripe("pk_test_51QWWzXP3msuX5JsQSplZGGjyhrOS45hW5DMNnmIlHfUri1nzUA4Jgx9a0SxMVtXRIHJT8ofwwjeyDuvjgaCMRPEk00oYLG2N4U");

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />} >
        <Route index element={<HomePage />} />
        <Route path="view/:id" element={<ViewPage />} />
        <Route path="checkout/:id" element={<CheckoutPage stripePromise={stripePromise}/>} />
        <Route path="complete" element = {<CompletePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  const checkoutId = () => {};

  return <RouterProvider router={router} />;
};

export default App;
