import { Container, AppBar, Grid, Grow, Typography } from "@mui/material";
import { Navbar } from "./components/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Auth } from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";
import { PostDetails } from "./components/PostDetails/PostDetails";

function App() {
  const [logOutState, setLogoutState] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));
  const objectLength = user == null ? user : null;
  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_NEXT_PUBLIC_GOOGLE_API_TOKEN}
    >
      <Container maxWidth="xl">
        <Navbar setLogoutState={setLogoutState} />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/auth"
            element={!objectLength ? <Auth /> : <Navigate to="/posts" />}
          />
          {/* <Route path="/auth" element={<Auth />} /> */}
        </Routes>
      </Container>
    </GoogleOAuthProvider>
  );
}

export default App;
