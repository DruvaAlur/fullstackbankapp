import axios from "axios";
import { useState } from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/joy/TextField";
import NavBar from "../AdminDashboard/NavigationBar/NavBar";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function CreateCustomer() {
  const [firstName, updatefirstName] = useState("");
  const [lastName, updatelastName] = useState("");
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [status, updateStatus] = useState("");
  const [role, updateRole] = useState("user");
  const currentUser = useParams();
  const navigation = new useNavigate();
  const [loginStatus, updateLoginStatus] = useState("");

  useEffect(() => {
    axios
      .post(
        `http://localhost:8800/api/v1/isAdminLoggedIn/${currentUser.username}`,
        {}
      )
      .then((resp) => {
        updateLoginStatus(true);
      })
      .catch((error) => {
        console.log(error.response.data);
        updateLoginStatus(false);
      });
  }, []);

  if (!loginStatus) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        <p style={{ color: "red", fontSize: "20px" }}>
          User not logged in please login by clicking below
        </p>

        <button
          onClick={() => navigation("/")}
          class="btn btn-secondary button"
        >
          login
        </button>
      </div>
    );
  }
  const handleCreateCustomer = () => {
    axios
      .post("http://localhost:8800/api/v1/createCustomer", {
        firstName,
        lastName,
        username,
        password,
        role,
      })
      .then((resp) => {
        updateStatus(<Alert severity="success">Customer Created!</Alert>);
      })
      .catch((error) => {
        updateStatus(<Alert severity="error">{error.response.data}</Alert>);
      });
  };
  return (
    <>
      <NavBar username={currentUser.username} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={
            {
              // padding: "40px",
              // background: "black",
              // width: "auto",
            }
          }
        >
          <form
            style={{ width: "25vw", background: "#80C2CE", padding: "40px" }}
          >
            <div>
              <h3>Create Customer</h3>
            </div>
            <TextField
              label="Firstname"
              // placeholder="Type in here"
              variant="outlined"
              onChange={(e) => updatefirstName(e.target.value)}
            />
            <br />
            <TextField
              label="Last Name"
              // placeholder="Type in here"
              variant="outlined"
              onChange={(e) => updatelastName(e.target.value)}
            />
            <br />
            <TextField
              label="UserName"
              // placeholder="Type in here"
              variant="outlined"
              onChange={(e) => updateUsername(e.target.value)}
            />
            <br />
            <TextField
              label="Password"
              // placeholder="Type in here"
              variant="outlined"
              onChange={(e) => updatePassword(e.target.value)}
            />
            <br />
            {/* <select
          id="role"
          name="role"
          onChange={(e) => {
            updateRole(e.target.value);
          }}
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select> */}
            <label>
              <b>Role</b>
            </label>

            <Select
              style={{ background: "white" }}
              value={role}
              label="Role"
              onChange={(e) => {
                updateRole(e.target.value);
              }}
              fullWidth
            >
              <MenuItem value={"user"}>user</MenuItem>
              <MenuItem value={"admin"}>admin</MenuItem>
            </Select>
            <br />
            <br />
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleCreateCustomer}
              >
                Create Customer
              </button>
            </Box>
            <br />

            {status}
          </form>
        </div>
      </div>
    </>
  );
}
export default CreateCustomer;
