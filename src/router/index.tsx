import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import DashboardLayout from '../pages/DashboardLayout/DashboardLayout';
import Products from '../pages/Products/Products';
import ShowItem from '../pages/ShowItem/ShowItem';
import AddItem from '../pages/AddItem';
import EditItem from '../pages/EditItem';
import ProtectedRoute from '../components/ProtectedRoute';

const router = createBrowserRouter([
  { path: '/', element: <SignIn /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Products /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:id', element: <ShowItem /> },
      { path: 'products/add', element: <AddItem /> },
      { path: 'products/:id/edit', element: <EditItem /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
