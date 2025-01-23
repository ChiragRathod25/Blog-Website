import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { Header, Footer } from "./components";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom"
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
               dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  console.log("App.jsx",loading);
  
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-500">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
