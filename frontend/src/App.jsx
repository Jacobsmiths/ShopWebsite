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

const stripePromise = loadStripe(
  "pk_test_51QWWzXP3msuX5JsQSplZGGjyhrOS45hW5DMNnmIlHfUri1nzUA4Jgx9a0SxMVtXRIHJT8ofwwjeyDuvjgaCMRPEk00oYLG2N4U"
);

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="view/:id" element={<ViewPage />} loader={productLoader} />
        <Route
          path="checkout/:id"
          element={<CheckoutPage stripePromise={stripePromise} />}
        />
        <Route path="complete" element={<CompletePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
