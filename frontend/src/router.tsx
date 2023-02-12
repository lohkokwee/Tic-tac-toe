import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import LandingPage from './pages/LandingPage';
import HomePage from "./pages/HomePage";
import NotFoundPage from './pages/NotFoundPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} errorElement={<NotFoundPage />} />
      <Route path="/home" element={<HomePage />} />
    </>
  )
)