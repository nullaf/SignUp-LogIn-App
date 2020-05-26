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

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});
var validator = require("email-validator");

function App() {
  const [inputState, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassState, setShowPass] = useState(false);
  const [isMailState, setIsMail] = useState(false);
  const [isMailState2, setIsMail2] = useState(false);
  const [passEqualState, setPassEqual] = useState(true);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPass(!showPassState);
  };

  function validateFormSignIn() {
    return inputState.length > 0 && password.length;
  }
  function validateFormSignUp() {
    return (
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      username.length > 0 &&
      passEqualState &&
      isMailState
    );
  }
  function handleSubmit(event) {
    event.preventDefault();
  }

  const [authState, setAuth] = useState(0);
  if (authState === 1) {
    return (
      <div className="App">
        <Helmet>
          <style>{"body { background-color: #EFEFEF; }"}</style>
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
      </div>
    );
  } else if (authState === 0) {
    return (
      <ThemeProvider theme={theme}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className="signIn">
            <Helmet>
              <style>{"body { background-color: #2c303a; }"}</style>
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
                  label="Username or Email"
                  variant="outlined"
                  fullWidth
                  autoFocus
                  required
                  color="secondary"
                  type={isMailState2 ? email : null}
                  value={inputState}

                  onChange={(e) => {
                    setInput(e.target.value);
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
                onClick={() => {
                  setAuth(1);
                }}
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
              >
                Forgot Password
              </Button>
            </Grid>
          </div>
        </form>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className="signUp">
            <Helmet>
              <style>{"body { background-color: #2c303a; }"}</style>
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
                  label="Username"
                  variant="outlined"
                  fullWidth
                  autoFocus
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  color="secondary"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle color="secondary" />
                      </InputAdornment>
                    ),
                  }}
                >
                  {" "}
                </TextField>
                <TextField
                  style={{ marginTop: "1em" }}
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
                fullWidth
                disabled={!validateFormSignUp()}
                onClick={() => {
                  setAuth(0);
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
