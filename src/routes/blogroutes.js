import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../context/auth/authcontext";
import BlogListPage from "../pages/blog/blogpage";
import UserPage from "../pages/user/userpage";
import LoginPage from "../pages/login/loginpage";
import LogOutPage from "../pages/logoutpage.js/logout";
import BlogCreate from "../pages/blog/blogcreate";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }
  // If authenticated, render the child routes
  return children;
};

const NotProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  if (token) {
    return <Navigate to="/user" />;
  }
  return children;
};

const BlogRoutes = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <NotProtectedRoute>
              <LoginPage />
            </NotProtectedRoute>
          }
        ></Route>
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <LogOutPage />{" "}
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <BlogCreate />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/" element={<BlogListPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default BlogRoutes;
