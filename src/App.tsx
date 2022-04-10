import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authApi from "./api/authApi";
import Routing from "./routing/Routing";
import { selectAuth, setUserInfo } from "./store/reducers/authSlice";
import "./styles/index.scss";

function App(): React.ReactElement {
  const { userInfo } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      authApi
        .checkToken()
        .then(() => {
          // Success => handle here
          // const storedUser = localStorage.getItem("userInfo");
          // const userInfo = storedUser ? JSON.parse(storedUser) : null;
          // dispatch(setUserInfo(userInfo));
        })
        .catch((error) => {
          // API response status 500 => success => handle here
          if (error.status === 500) {
            const storedUser = localStorage.getItem("userInfo");
            const userInfo = storedUser ? JSON.parse(storedUser) : null;
            dispatch(setUserInfo(userInfo));
          }
          if (error.status !== 500) {
            navigate("/login");
          }
        });
    }
  }, [dispatch, navigate, userInfo]);
  return <Routing />;
}

export default App;
