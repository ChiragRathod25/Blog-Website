import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn({className}) {
  const dispatch = useDispatch();
  const LogoutBtnHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return <button className={`${className}`} onClick={LogoutBtnHandler}>Logout Btn</button>;
}

export default LogoutBtn;
