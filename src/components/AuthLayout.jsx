import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthLayout({ children, authentication = true }) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // if (authStatus === true) navigate("/");
    // else if (authStatus === false) navigate("/login");
    // setLoader(false);

    // let authValue = authStatus === true ? true : false;
    if(authentication===false){
      console.log("Authentication is not required !")
    }
    else if (authentication && authStatus !== authentication) 
        navigate("/login");
    
    else if (!authentication && authStatus !== authentication) 
        navigate("/");
    console.log("loader changed to ",loader)
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
