import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Layout from "./components/Layout/Layout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Recipe from "./pages/Recipe.tsx";
import Trending from "./pages/Trending.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
    // children: [
    //   {
    //     path: "/recipes/:recipeId",
    //     element: <Recipe />,
    //   },
    // ],
  },
  {
    path: "recipes/:recipeId",
    element: (
      <Layout>
        <Recipe />
      </Layout>
    ),
  },
  {
    path: "trending",
    element: (
      <Layout>
        <Trending />
      </Layout>
    ),
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
