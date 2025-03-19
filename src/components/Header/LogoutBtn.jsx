import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn({ className = "" }) {
  const dispatch = useDispatch();

  const LogoutBtnHandler = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      
    } catch (error) {
      alert("Logout failed! Please try again.");
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={LogoutBtnHandler}
      className={`px-5 py-2 bg-red-600 text-white rounded-md shadow-sm transition duration-300 hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500/50 ${className}`}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;

