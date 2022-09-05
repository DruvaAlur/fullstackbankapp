import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AvatarUploader from "react-avatar-uploader";
import Typography from "@mui/material/Typography";
import { Form, Divider, Portal, Segment } from "semantic-ui-react";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const pages = ["Create Contacts", "Get Contacts", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar(prop) {
  const username = prop.username;
  //   const username = props.username;
  //   const [anchorElNav, setAnchorElNav] = React.useState(null);
  //   const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigation = new useNavigate();

  const handleCreateBank = () => {
    navigation(`/adminDashboard/createBank/${username}`);
  };
  //   const handleUpdateContact = () => {
  //     navigation(`/userDashboard/UpdateContacts/${username}`);
  //   };
  //   const handleGetAllContact = () => {
  //     navigation(`/userDashboard/GetAllContacts/${username}`);
  //   };
  //   const handleCreateContactDetail = () => {
  //     navigation(`/userDashboard/createContactDetail/${username}`);
  //   };
  const handleLogout = async () => {
    await axios.post("http://localhost:8800/api/v1/logout").then(() => {
      navigation("/");
    });
  };
  const handleCreateAccount = () => {
    navigation(`/userDashboard/createAccount/${username}`);
  };
  const handleGetAllCustomers = () => [
    navigation(`/adminDashboard/getAllCustomers/${username}`),
  ];
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "Inherit",
              textDecoration: "none",
            }}
            // onClick={() =>
            // //   navigation(`/userDashboard/createContacts/${props.username}`)
            // }
          >
            Banking App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* <Button
              // onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={handleCreateBank}
            >
              Create Bank
            </Button> */}
            <Button
              // onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => {
                navigation(`/adminDashboard/createCustomer/${username}`);
              }}
            >
              Create Customer
            </Button>
            <Button
              // onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={handleCreateAccount}
            >
              Create Account
            </Button>
            <Button
              // onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={handleGetAllCustomers}
            >
              Get All Customers
            </Button>
            {/* <Button
              // onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              //   onClick={handleCreateContactDetail}
            >
              Create Contact Detail
            </Button> */}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <h5>Hi, {username}&nbsp;</h5>
          </Box>
          {/* <Box sx={{ flexGrow: 0 }}>
            <Avatar alt="Remy Sharp" src="" />
          </Box> */}
          <Form>
            <Form.Field>
              <AvatarUploader
                defaultImg="https://sunagro.com.tr/wp-content/uploads/2020/01/image-placeholder-350x350-1.png"
                size={50}
                name="asd"
                uploadURL="http://localhost:3000"
                fileType={"image"}
              />
            </Form.Field>
          </Form>
          <Box sx={{ flexGrow: 0 }}>
            <Button
              // onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
