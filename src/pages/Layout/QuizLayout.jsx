import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, Outlet } from "react-router-dom";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/features/authen/authenSlice";

const settings = [
  { name: "Profile", link: "/profile" },
  { name: "Account", link: "/account" },
  { name: "LogOut", link: "/logOut" },
];
const LOG_OUT = "LogOut";

const theme = createTheme();

const QuizLayout = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userAvatar = useSelector((state) => state.auth.otherInfos.user.avatar);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (item) => {
    setAnchorElUser(null);
  };
  const onItemClicked = (event, setting) => {
    if (setting.name !== LOG_OUT) {
      navigate(`${setting.link}`);
    } else {
      dispatch(logOut());
    }
    setAnchorElUser(null);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
              <Box>
                <IconButton color="inherit" sx={{ p: 0 }}>
                  <MenuIcon />
                </IconButton>
              </Box>

              <Typography variant="h6" noWrap component="div">
                Quiz
              </Typography>

              <Box>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={userAvatar} />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onClick={(event) => onItemClicked(event, setting)}
                    >
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
      <Outlet />
    </>
  );
};
export default QuizLayout;
