import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home';
import Explore from './pages/Explore';
import LocationDetail from './pages/LocationDetail';
import Booking from './pages/Booking';
import BookingRequest from './pages/BookingRequest';
import MyBookings from './pages/MyBookings';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'locations', element: <Explore /> },
      { path: 'locations/:slug', element: <LocationDetail /> },
      { path: 'booking', element: <Booking /> },
      { path: 'request', element: <BookingRequest /> },
      { path: 'my-bookings', element: <MyBookings /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
