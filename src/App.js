import "./App.css";
import { AuthProvider } from "./context/auth/authcontext";
import BlogRoutes from "./routes/blogroutes";
import NavBar from "./components/navbar/navbar";

function App() {
  return (
    <AuthProvider>
      <NavBar />

      <BlogRoutes />
    </AuthProvider>
  );
}

export default App;
