// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from '@redwoodjs/router';

import DashboardLayout from './components/DashboardLayout/DashboardLayout';

const Routes = () => {
  return (
    <Router>
      <Route path='/' page={LoginPage} name='login' />
      <Private unauthenticated='login'>
        <Set wrap={DashboardLayout}>
          <Route
            path='/dashboard/clients'
            page={MyClientsPage}
            name='myClients'
          />
          <Route
            path='/dashboard/client/{id}'
            page={MyClientPage}
            name='myClient'
          />
          <Route path='/dashboard' page={DashboardPage} name='dashboard' />
        </Set>
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  );
};

export default Routes;
