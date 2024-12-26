import { createBrowserRouter } from 'react-router-dom'; // Ensure you import from 'react-router-dom'
import MainLayout from '../mainLayout/MainLayout';
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import AllArtifacts from '../pages/AllArtifacts';
import SingleArt from '../pages/SingleArt';
import MyLoved from '../pages/MyLoved';
import MyAdded from '../pages/MyAdded';
import PrivateRoutes from '../secureRoutes/PrivateRoutes';
import PublicRoutes from '../secureRoutes/PublicRoutes';
import AddArt from '../pages/AddArt';
import UpdateArt from '../pages/UpdateArt';

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
        path: '/artifact/:id', // Use :id instead of :url
        element: (
          <PrivateRoutes>
            <SingleArt />
          </PrivateRoutes>
        ),
      },
      {
        path: '/update/:id', // Use :id instead of :url
        element: (
          <PrivateRoutes>
            <UpdateArt/>
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`https://auvral-server.vercel.app/artifacts/${params.id}`),
      },
      {
        path: '/my-added-artifacts',
        element: (
          <PrivateRoutes>
            <MyAdded />
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
