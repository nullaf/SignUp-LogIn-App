import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Components/home";
import About from "./Components/about";
import Contact from "./Components/contact";
import "./App.scss";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Grid from "@material-ui/core/Grid";
import LockIcon from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Helmet } from "react-helmet";
import MUISwitch from "@material-ui/core/Switch";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  const [authState, setAuth] = useState(0);
  if (authState === 1) {
    return (
      <Router>
        <Helmet>
          <style>{"body { background-color: #EFEFEF; }"}</style>
        </Helmet>
        <div className="buttons">
          <Button variant="contained">
            <Link to={"/"} className="nav">
              {" "}
              Home{" "}
            </Link>
          </Button>
          <Button variant="contained">
            <Link to={"/contact"} className="nav">
              Contact
            </Link>
          </Button>
          <Button variant="contained">
            <Link to={"/about"} className="nav">
              About
            </Link>
          </Button>
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
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/contact" component={Contact} />
            <Route path="/about" component={About} />
          </Switch>
        </div>
      </Router>
    );
  } else if (authState === 0) {
    return (
      <ThemeProvider theme={theme}>
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
                label="Username"
                variant="outlined"
                fullWidth
                autoFocus
                required
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
                type="password"
                autoComplete="current-password"
                variant="outlined"
                fullWidth
                required
                color="secondary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="secondary" />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>

            <Button
              className="login"
              variant="contained"
              size="large"
              color="secondary"
              fullWidth
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
              onClick={() => {
                setAuth(2);
              }}
            >
              Sign Up
            </Button>
          </Grid>
        </div>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <div className="signIn">
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
                type="password"
                autoComplete="current-password"
                variant="outlined"
                fullWidth
                required
                color="secondary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="secondary" />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <TextField
                style={{ marginTop: "1em" }}
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                fullWidth
                required
                color="secondary"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="secondary" />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>

            <Button
              className="login"
              variant="contained"
              size="large"
              color="secondary"
              fullWidth
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
      </ThemeProvider>
    );
  }
}

export default App;
