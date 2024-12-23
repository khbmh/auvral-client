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

const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/all-artifacts', element: <AllArtifacts /> },
      { path: '/single-artifact', element: <SingleArt/> },
      { path: '/my-added-artifacts', element: <Myadded/> },
      { path: '/my-loved-artifacts', element: <MyLoved/> },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

export default Router;
