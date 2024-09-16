import { Route, Routes } from "react-router-dom";
import Layout from "./containers/Layout";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dishboard/Dishboard";
import AddItem from "./pages/AddItem/AddItem";
import AddCategory from "./pages/AddCategory/AddCategory";
import AddCourtOffice from "./pages/AddCourtOffice/AddCourtOffice";
import AddEmployee from "./pages/AddEmployee/AddEmployee";
import AddVendor from "./pages/AddVendor/AddVendor";
import AddUser from "./pages/AddUser/AddUser";
import AddStock from "./pages/AddStock/AddStock";

// Placeholder components for now
const DeductStock = () => <div>I am DeductStock</div>;
const DatewiseReport = () => <div>I am DatewiseReport</div>;
const CategoryItemReport = () => <div>I am CategoryItemReport</div>;
const CourtOfficeReport = () => <div>I am CourtOfficeReport</div>;

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/add-item"
        element={
          <Layout>
            <AddItem />
          </Layout>
        }
      />
      <Route
        path="/add-category"
        element={
          <Layout>
            <AddCategory />
          </Layout>
        }
      />
      <Route
        path="/add-court-office"
        element={
          <Layout>
            <AddCourtOffice />
          </Layout>
        }
      />
      <Route
        path="/add-employee"
        element={
          <Layout>
            <AddEmployee />
          </Layout>
        }
      />
      <Route
        path="/add-vendor"
        element={
          <Layout>
            <AddVendor />
          </Layout>
        }
      />
      <Route
        path="/add-user"
        element={
          <Layout>
            <AddUser />
          </Layout>
        }
      />
      <Route
        path="/add-stock"
        element={
          <Layout>
            <AddStock />
          </Layout>
        }
      />
      <Route
        path="/deduct-stock"
        element={
          <Layout>
            <DeductStock />
          </Layout>
        }
      />
      <Route
        path="/datewise-report"
        element={
          <Layout>
            <DatewiseReport />
          </Layout>
        }
      />
      <Route
        path="/category-item-report"
        element={
          <Layout>
            <CategoryItemReport />
          </Layout>
        }
      />
      <Route
        path="/court-office-report"
        element={
          <Layout>
            <CourtOfficeReport />
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;

/* 
/login
/dashboard
/add-item
/add-category
/add-court-office
/add-employee
/add-vendor
/add-user
/add-stock
/deduct-stock
/datewise-report
/category-item-report
/court-office-report
*/
