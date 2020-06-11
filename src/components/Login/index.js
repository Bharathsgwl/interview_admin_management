import React from "react";
import "./index.css";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  Card,
  CardContent,
  Toolbar,
  Typography,
  AppBar,
  IconButton
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SnackBar from "../SnackBar";
import { connect } from "react-redux";
import {
  handleFieldChange,
  onClickLogin,
  handleOnSnackBarClose,
  setStatesFromResponse
} from "../../redux/actions";
import * as actionTypes from "../../redux/actionTypes";
import { withRouter } from "react-router-dom";
import axios from "axios";
class Login extends React.Component {
  // componentDidMount() {
  //   
  //   console.log("Component is mounting",this.props.auth_token);

  //   this.handleValidation();
  //

  onClickLogin = () => {
    var {
      login,
      message,
      history,
      auth_token,
      snackbarOpen,
      setStatesFromResponse,
      handleOnSnackBarClose
    } = this.props;
    const { handleSessionStorage, handleValidation } = this;
    var { username, password } = login;

    if (login.username == "" && login.password == "") {
      let msg = "Enter Credentials";
      setStatesFromResponse("message", msg);
      console.log(msg, "msggg");
      handleOnSnackBarClose();
    } else if (login.username.length <= 4) {
      let msg = "Credentials should be greater than 4";
      setStatesFromResponse("message", msg);
      handleOnSnackBarClose();
    } else {
      axios
        .post(`https://evening-dawn-93464.herokuapp.com/api/login`, {
          user_name: username,
          password: password
        })
        .then(response => {
          if (response.data.login_message) {
            console.log(response.data.login_message);
            message = response.data.login_message;
            setStatesFromResponse("message", message);
            handleOnSnackBarClose();
          } else if (response.data.all) {
            console.log(response.data);
            auth_token = response.data.auth_token;
            return (
              handleSessionStorage(
                response.data.all[0],
                response.data.auth_token
              ),
              handleValidation()
            );
          }
        });
    }
  };

  handleSessionStorage = (data, auth_token) => {
    var { history } = this.props;
    sessionStorage.setItem("user_uuid", data.uuid);
    sessionStorage.setItem("auth_token", auth_token);
    history.push("/menu");
  };

  handleValidation = () => {
    axios
      .post(`https://evening-dawn-93464.herokuapp.com/api/validate`, {
        auth_token: sessionStorage.getItem("auth_token")
      })
      .then(response => {
        console.log("auth resp", response.data);
      });
  };

  render() {
    console.log(this.props);
    const { handleFieldChange, login, history } = this.props;
    const { onClickLogin } = this;

    return (
      <React.Fragment>
        <Grid container>
          <Grid item md={12}>
            <AppBar position="static" style={{ background: "#009688" }}>
              <Toolbar>
                <Grid item md={12}>
                  <Typography
                    style={{ fontFamily: '"Apple Color Emoji"' }}
                    variant="h5"
                  >
                    GoodWorks Colloquio
                  </Typography>
                </Grid>
              </Toolbar>
            </AppBar>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 10 }}>
          <Grid
            item
            md={7}
            style={{ background: "#009688", height: "578px", width: "50000px" }}
          ></Grid>

          <Grid item md={5} xs={12} classes={{ root: "displaying" }}>
            <Card classes={{ root: "card" }}>
              <CardContent>
                <Typography>Login</Typography>
                <Typography color="textSecondary" gutterBottom>
                  <TextField
                    id="outlined-name"
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    value={login.username}
                    onChange={e =>
                      handleFieldChange("username", e.target.value, "login")
                    }
                  />
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    onChange={e =>
                      handleFieldChange("password", e.target.value, "login")
                    }
                    value={login.password}
                  />
                </Typography>
                <Typography>
                  {" "}
                  <Button
                    variant="contained"
                    style={{ background: "#009688", color: "white" }}
                    onClick={() => { onClickLogin() }}
                  >
                    SUBMIT
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <SnackBar />
        </Grid>
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({
  snackBar,
  snackbarOpen,
  login,
  message,
  history,
  auth_token
}) => {
  return {
    snackBar,
    login,
    message,
    snackbarOpen,
    history,
    auth_token
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleFieldChange: (property1, value1, propertyObj) =>
      dispatch(handleFieldChange(property1, value1, propertyObj)),
    handleOnSnackBarClose: () => dispatch(handleOnSnackBarClose()),
    setStatesFromResponse: (attribute, val) =>
      dispatch(setStatesFromResponse(attribute, val))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
