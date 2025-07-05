import App from '@/App';
import AllBooks from '@/pages/AllBooks';
import BookDetails from '@/pages/BookDetails';
import BorrowBook from '@/pages/BorrowBook';
import BorrowSummary from '@/pages/BorrowSummary';
import CreateBook from '@/pages/CreateBook';
import ErrorPage from '@/pages/ErrorPage';
import Home from '@/pages/Home';
import UpdateBook from '@/pages/UpdateBook';
import { createBrowserRouter } from 'react-router';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        children: [
          {
            path: '/',
            element: <AllBooks></AllBooks>
          }
        ]
      },

      // ----- BOOK LIST (VIEW, DELETE, EDIT, BORROW)
      {
        path: '/books',
        element: <AllBooks></AllBooks>
      },

      // ----- ADD A NEW BOOK
      {
        path: '/create-book',
        element: <CreateBook></CreateBook>
      },

      // ----- SINGLE BOOK INFO
      {
        path: '/books/:id',
        element: <BookDetails></BookDetails>
      },

      // ----- UPDATE BOOK INFO
      {
        path: '/edit-book/:id',
        element: <UpdateBook></UpdateBook>
      },

      // ----- BORROW A BOOK
      {
        path: '/borrow/:bookId',
        element: <BorrowBook></BorrowBook>
      },

      // ----- BORROWED BOOKS SUMMARY
      {
        path: '/borrow-summary',
        element: <BorrowSummary></BorrowSummary>
      },
    ]
  },
]);

export default routes;