import { createBrowserRouter } from "react-router";
import MainLayout from "../mainLayout/MainLayout";
import ErrorPage from "../pages/ErrorPage";

const Router = createBrowserRouter([{
  path: "/",
  element: <MainLayout/>,
  errorElement: <ErrorPage/>,
}])

export default Router;