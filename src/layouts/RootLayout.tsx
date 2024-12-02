import { IconButton, styled, Tooltip, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Navigate,
  Outlet,
  useLocation,
  NavLink as RouterLink,
} from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { ACCESS_KEY } from "../config";

const StyledRoot = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  overflow: "hidden",
  flexDirection: "column",
  background: "#f8f8f8",
});

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "64px",
  backgroundColor: "rgb(19, 25, 36)",
  padding: "20px",
  boxSizing: "border-box",
});

const RootLayout = () => {
  const location = useLocation();
  const { signOut } = useContext(UserContext);

  if (!localStorage.getItem(ACCESS_KEY)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <StyledRoot>
      <Header>
        <Typography variant="h5" align="center" style={{ color: "#ffffff" }}>
          Tasks Manager
        </Typography>
        <Tooltip title="Logout">
          <IconButton
            component={RouterLink}
            to={"/login"}
            onClick={signOut}
            key="logout"
          >
            <LogoutIcon style={{ fill: "#ffffff" }} />
          </IconButton>
        </Tooltip>
      </Header>
      <Outlet />
    </StyledRoot>
  );
};

export default RootLayout;
