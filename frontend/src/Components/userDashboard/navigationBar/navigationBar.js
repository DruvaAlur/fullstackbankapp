import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import AvatarUploader from "react-avatar-uploader";
import Container from "@mui/material/Container";
import { Form, Divider, Portal, Segment } from "semantic-ui-react";
import Button from "@mui/material/Button";

import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ResponsiveAppBar(prop) {
  const username = prop.username;
  //   const username = props.username;
  //   const [anchorElNav, setAnchorElNav] = React.useState(null);
  //   const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigation = new useNavigate();

  const transferMoney = () => {
    navigation(`/userDashboard/transferMoney/${username}`);
  };
  const handleWithdrawMoney = () => {
    navigation(`/userDashboard/withdrawMoney/${username}`);
  };
  const selfTransfer = () => {
    navigation(`/userDashboard/selfTransfer/${username}`);
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
  const handleGetAllAccounts = () => {
    navigation(`/userDashboard/getAccounts/${username}`);
  };
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
            <Button
              // onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => {
                navigation(`/userDashboard/depositMoney/${username}`);
              }}
            >
              Deposit Money
            </Button>
            <Button
              onClick={handleWithdrawMoney}
              sx={{ my: 2, color: "white", display: "block" }}
              //   onClick={handleGetAllContact}
            >
              Withdraw Money
            </Button>
            <Button
              // onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={transferMoney}
            >
              Transfer Money
            </Button>
            {/* <Button
              // onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={selfTransfer}
            >
              Self Transfer
            </Button> */}
            <Button
              onClick={handleGetAllAccounts}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              PassBook
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <h5>Hi, {username}&nbsp;</h5>
          </Box>

          {/* <Avatar
              alt="Remy Sharp"
              src=""
              uploadURL="http://localhost:3000"
              fileType={"image"}
            /> */}
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
