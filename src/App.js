import React, { useState } from "react";
import "./App.scss";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Grid from "@material-ui/core/Grid";
import LockIcon from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Helmet } from "react-helmet";
import MailIcon from "@material-ui/icons/Mail";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Home from "./Components/home";
import app from "./firebase";


const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});
var validator = require("email-validator");

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassState, setShowPass] = useState(false);
  const [isMailState, setIsMail] = useState(false);
  const [isMailState2, setIsMail2] = useState(false);
  const [passEqualState, setPassEqual] = useState(true);
  const [errorState, setError] = useState("");
  const [succesState, setSucces] = useState("");
  const [verifyState , setVerify] = useState(1);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPass(!showPassState);
  };

  function validateFormSignIn() {
    return email.length > 0 && password.length;
  }
  function validateFormSignUp() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      passEqualState &&
      isMailState
    );
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const sendEmail = async (event) => {
    try {
      const user = await app.auth().signInWithEmailAndPassword(email, password).then(userData => {
        userData.user.sendEmailVerification()
        setSucces("Email verification sent successfully!")
      })

    }
    catch(error) {
      alert(error);
    }
  };

  const onSubmitSignup = async (event) => {
    try {
      const user = await app
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userData) => {
          userData.user.sendEmailVerification()
          setSucces("Email verification sent successfully!");
        });

    } catch (error) {
      alert(error);
    }
  };
  const onSubmitSignin = async (event) => {

    try {
      const user = await app.auth().signInWithEmailAndPassword(email, password).then(userData => {
        if(userData.user.emailVerified) {
          setAuth(1);
          setError("");
          setSucces("")
          setVerify(1)
        }
        else {
          setError("You need to verify your email address before login.")
          setVerify(0)
        }
      })

    } catch (error) {
      setError(error.message);
    }
  };
  const passwordReset = async (event) => {
    try {
      const user = await app.auth().sendPasswordResetEmail(email);
      setSucces("We have emailed your reset link!");
    } catch (error) {
      !email.length
        ? setError(
            "You should enter your email before using forgot password."
          )
        : setError(error.message);
    }
  };

  const [authState, setAuth] = useState(0);
  if (authState === 1) {
    return (
      <div className="App">
        <Helmet>
          <style>{"body { background-color: #1d1e22; }"}</style>
        </Helmet>

        <Button
          variant="contained"
          className="signOut"
          color="secondary"
          size="large"
          onClick={() => {
            setAuth(0);
          }}
        >
          Sign Out
        </Button>
        <Home />
      </div>
    );
  } else if (authState === 0) {
    return (
      <ThemeProvider theme={theme}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div
            className="successPart"
            style={succesState !== "" ? { background: "greenyellow" } : null}
          >
            <b>{succesState}</b>
          </div>
          <div className="signIn">
            <Helmet>
              <style>{"body { background-color: #1d1e22; }"}</style>
            </Helmet>
            <Typography variant="h2" color="secondary">
              Sign In
            </Typography>

            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              className="textfieldgrid"
            >
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className="username"
              >
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  autoFocus
                  required
                  color="secondary"
                  type={isMailState2 ? email : null}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsMail2(e.target.value.includes("@"));
                    setIsMail(validator.validate(e.target.value));
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {isMailState2 ? null : (
                          <AccountCircle color="secondary" />
                        )}
                        {isMailState2 ? <MailIcon color="secondary" /> : null}
                      </InputAdornment>
                    ),
                  }}
                >
                  {" "}
                </TextField>
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className="password"
              >
                <TextField
                  label="Password"
                  type={showPassState ? "text" : "password"}
                  autoComplete="current-password"
                  variant="outlined"
                  fullWidth
                  required
                  color="secondary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="secondary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassState ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Button
                className="login"
                variant="contained"
                size="large"
                color="secondary"
                fullWidth
                type="submit"
                disabled={!validateFormSignIn()}
                onClick={onSubmitSignin}
              >
                Login
              </Button>
              <Button
                className="login"
                variant="outlined"
                size="large"
                color="secondary"
                fullWidth
                floatingLabelText="Password"
                onClick={() => {
                  setAuth(2);
                }}
              >
                Sign Up
              </Button>
              <Button
                className="login"
                variant="outlined"
                size="large"
                color="secondary"
                fullWidth
                floatingLabelText="Password"
                onClick={passwordReset}
              >
                Forgot Password
              </Button>
              <div className="errorPart">
                {errorState !== "" ? (
                  <ErrorOutlineIcon fontSize="large" color="secondary" />
                ) : (
                  ""
                )}
                <Typography variant="h6" color="secondary" fullWidth>
                  {errorState !== "" ? errorState : ""}
                </Typography>
                <Button color="secondary" onClick={sendEmail} variant="outlined" style={verifyState ? {display: "none"} : null}>Send Verification</Button>
              </div>
            </Grid>
          </div>
        </form>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div
            className="successPart"
            style={succesState !== "" ? { background: "greenyellow" } : null}
          >
            <b>{succesState}</b>
          </div>
          <div className="signUp">
            <Helmet>
              <style>{"body { background-color: #1d1e22; }"}</style>
            </Helmet>

            <Typography variant="h2" color="secondary">
              Sign Up
            </Typography>

            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              className="textfieldgrid"
            >
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className="username"
              >
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  error={isMailState || !email.length ? 0 : 1}
                  helperText={
                    isMailState || !email.length
                      ? ""
                      : "Your email address is invalid."
                  }
                  color="secondary"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsMail(validator.validate(e.target.value));
                  }}
                  value={email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon color="secondary" />
                      </InputAdornment>
                    ),
                  }}
                >
                  {" "}
                </TextField>
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className="password"
              >
                <TextField
                  label="Password"
                  type={showPassState ? "text" : "password"}
                  autoComplete="current-password"
                  variant="outlined"
                  fullWidth
                  required
                  color="secondary"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPassEqual(e.target.value === confirmPassword);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="secondary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassState ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  style={{ marginTop: "1em" }}
                  label="Confirm Password"
                  type={showPassState ? "text" : "password"}
                  autoComplete="current-password"
                  variant="outlined"
                  fullWidth
                  required
                  error={passEqualState ? 0 : 1}
                  helperText={
                    passEqualState
                      ? ""
                      : "The password confirmation does not match."
                  }
                  color="secondary"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPassEqual(password === e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="secondary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassState ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Button
                className="login"
                variant="contained"
                size="large"
                color="secondary"
                type="submit"
                fullWidth
                disabled={!validateFormSignUp()}
                onClick={onSubmitSignup}
              >
                Sign Up
              </Button>
              <Button
                className="login"
                variant="outlined"
                size="large"
                color="secondary"
                fullWidth
                onClick={() => {
                  setAuth(0);
                }}
              >
                Back
              </Button>
            </Grid>
          </div>
        </form>
      </ThemeProvider>
    );
  }
}

export default App;
