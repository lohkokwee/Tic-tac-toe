import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import App from "./App";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} errorElement={<NotFoundPage />} />
      <Route path="/home" element={<App />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="/history" element={<App />}>
        <Route index element={<HistoryPage />} />
      </Route> 
      <Route path="/profile" element={<App />}>
        <Route index element={<ProfilePage />} />
      </Route> 
    </>
  )
)