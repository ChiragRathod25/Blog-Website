import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { Header, Footer } from "./components";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        userData ? dispatch(login({ userData })) : dispatch(logout());
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  return loading ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <p className="text-lg font-medium text-gray-700 dark:text-gray-300 animate-pulse">
        Loading...
      </p>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
