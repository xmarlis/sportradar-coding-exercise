import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import AddEventPage from "./pages/AddEventPage.jsx";
import EventDetailPage from "./pages/EventDetailPage.jsx";
import "./styles/globals.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <CalendarPage /> },
      { path: "add", element: <AddEventPage /> },
      { path: "event/:id", element: <EventDetailPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
