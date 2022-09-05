import axios from "axios";
import { useState } from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/joy/TextField";
import { useParams } from "react-router-dom";
import NavBar from "../userDashboard/navigationBar/navigationBar";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function WithdrawMoney() {
  const navigation = new useNavigate();
  const currentUser = useParams();
  const [status, updateStatus] = useState("");
  const [amount, updateAmount] = useState("");
  const [bankAbbre, updateBankAbbre] = useState("");
  const [loginStatus, updateLoginStatus] = useState("");
  const [allAccounts, updateAllAccounts] = useState("");
  useEffect(() => {
    axios
      .post(
        `http://localhost:8800/api/v1/isUserLoggedIn/${currentUser.username}`,
        {}
      )
      .then((resp) => {
        updateLoginStatus(true);
      })
      .catch((error) => {
        console.log(error.response.data);
        updateLoginStatus(false);
      });
    // axios
    //   .get(
    //     `http://localhost:8800/api/v1/getAllAccounts/${currentUser.username}`
    //   )
    //   .then((resp) => {
    //     console.log(resp.data);
    //     updateAllAccounts(resp.data);

    //     // updateBankAbbre(resp.data[0].bank.bankAbbre);
    //   })
    //   .catch((error) => {
    //     console.log(error.response.data);
    //   });
  }, []);
  // let optionsOfBankAbbrevation;
  // if (allAccounts != null) {
  //   optionsOfBankAbbrevation = Object.values(allAccounts).map((a) => {
  //     return <option value={a.bank.bankAbbre}>{a.bank.bankAbbre}</option>;
  //   });
  // }
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
  const handleWithdrawmoney = () => {
    axios
      .post(
        `http://localhost:8800/api/v1/withdrawMoney/${currentUser.username}`,
        {
          amount,
          // bankAbbre,
        }
      )
      .then((response) => {
        updateStatus(
          <Alert severity="success">Money Withdraw Successfull!</Alert>
        );
      })
      .catch((error) => {
        updateStatus(<Alert severity="error">{error.response.data}</Alert>);
      });
  };
  return (
    <>
      <NavBar username={currentUser.username} />
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
        <div style={{ background: "#80C2CE", padding: "40px" }}>
          <form style={{ width: "35vw" }}>
            <div>
              <h3>Withdraw Money</h3>
            </div>
            <TextField
              label="ammount"
              placeholder="Type in here"
              variant="outlined"
              onChange={(e) => updateAmount(e.target.value)}
              style={{ width: "30vw", height: "40px" }}
            />
            {/* <TextField
          label="Bank Abbrevation"
          placeholder="Type in here"
          variant="outlined"
          onChange={(e) => updateBankAbbre(e.target.value)}
        /> */}
            <br />
            <br />
            {/* <label class="fw-bold">Bank Abbrevation</label>
            <br />
            <select
              id="BankAbbrevation"
              name="BankAbbrevation"
              onChange={(e) => {
                updateBankAbbre(e.target.value);
              }}
              style={{ width: "30vw", height: "40px" }}
            >
              {optionsOfBankAbbrevation}
            </select>

            <br />
            <br /> */}

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleWithdrawmoney}
              >
                Withdraw money
              </button>
            </Box>
            <br />
            <br />
            {status}
          </form>
        </div>
      </div>
    </>
  );
}
export default WithdrawMoney;
