import { AppBar, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { logout } from "../../redux/features/userSlice";
import {
  BrandContainer,
  Profile,
  Purple,
  UserName,
  ToolbarComp,
  AppBarComp,
} from "./style";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { getPosts } from "../../redux/features/postSlice";

export const Navbar = ({ setLogoutState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const logOut = () => {
    dispatch(logout());
    setUser(null);
    setLogoutState((prevState) => !prevState);
    navigate("/");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logOut();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <AppBarComp position="static" color="inherit">
      <BrandContainer to="/">
        <img src="/memories-Text.png" alt="icon" height="45px" />
        <img
          src="/memories-Logo.png"
          alt="icon"
          height="40px"
          style={{ marginLeft: "10px", marginTop: "5px" }}
        />
      </BrandContainer>
      <ToolbarComp>
        {user?.result ? (
          <Profile>
            <Purple alt={user?.result?.name} src={user?.result?.imageUrl}>
              {user?.result?.name?.charAt(0)}
            </Purple>
            <UserName variant="h6">{user?.result?.name}</UserName>
            <Button variant="contained" color="secondary" onClick={logOut}>
              Logout
            </Button>
          </Profile>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        )}
      </ToolbarComp>
    </AppBarComp>
  );
};
