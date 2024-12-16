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

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="view/:id" element={<ViewPage />} />
        {/* <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  const checkoutId = () => {};

  return <RouterProvider router={router} />;
};

export default App;
