import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import MokaStudio from "../pages/MokaStudio";
import WorksPage from "../pages/WorksPage";
import SocialMediaPage from "../pages/SocialMediaPage";
import ProductionPage from "../pages/ProductionPage";
import EventsPage from "../pages/EventsPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "moka-studio", Component: MokaStudio },
      { path: "trabajos", Component: WorksPage },
      { path: "experiencias/redes-sociales", Component: SocialMediaPage },
      { path: "experiencias/produccion-audiovisual", Component: ProductionPage },
      { path: "experiencias/eventos", Component: EventsPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

export default router;
