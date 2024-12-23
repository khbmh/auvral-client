import { createBrowserRouter } from 'react-router';
import MainLayout from '../mainLayout/MainLayout';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import AllArtifacts from '../pages/AllArtifacts';
import SingleArt from '../pages/SingleArt';
import MyLoved from '../pages/MyLoved';
import Myadded from '../pages/Myadded';
import PrivateRoutes from '../secureRoutes/PrivateRoutes';
import PublicRoutes from '../secureRoutes/PublicRoutes';
import AddArt from '../pages/AddArt';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/add-artifacts',
        element: (
          <PrivateRoutes>
            <AddArt />
          </PrivateRoutes>
        ),
      },
      { path: '/all-artifacts', element: <AllArtifacts /> },
      {
        path: '/single-artifact',
        element: (
          <PrivateRoutes>
            <SingleArt />
          </PrivateRoutes>
        ),
      },
      {
        path: '/my-added-artifacts',
        element: (
          <PrivateRoutes>
            <Myadded />
          </PrivateRoutes>
        ),
      },
      {
        path: '/my-loved-artifacts',
        element: (
          <PrivateRoutes>
            <MyLoved />
          </PrivateRoutes>
        ),
      },
      {
        path: '/register',
        element: (
          <PublicRoutes>
            <Register />
          </PublicRoutes>
        ),
      },
      {
        path: '/login',
        element: (
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        ),
      },
    ],
  },
]);

export default Router;
