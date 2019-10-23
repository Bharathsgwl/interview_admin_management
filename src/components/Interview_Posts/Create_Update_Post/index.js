import React from "react";
import "./index.css";

import {
  Typography,
  Grid,
  TextField,
  DialogTitle,
  Button,
  FormControl,
  Dialog,
  InputLabel,
  Select,
  Input,
  MenuItem
} from "@material-ui/core";
import {
  handleOnToggleDialog,
  handleFieldChange,
  handleOnPosts
} from "../../../redux/actions";
import * as actionTypes from "../../../redux/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
class Create_Update_Post extends React.Component {
  handleOnCreatePost = () => {
    var { post } = this.props;
    const uuid = require("uuid/v4").default;
    axios
      .post("http://localhost:8080/api/post", {
        uuid: uuid(),
        post_name: post.post_name,
        threshold: post.threshold,
        created_by: "GWLADMIN124"
      })
      .then(response => {
        console.log(response.data, "res");
      });
    this.props.handleOnToggleDialog();
  };
  handleOnUpdatePost = () => {};
  handleClose = () => {
    this.props.handleOnToggleDialog();
  };
  render() {
    const {
      post = {},
      handleFieldChange,
      roleList = [],
      userRoles,
      toggleDialog,
      handleOnToggleDialog,
      handleOnPosts
    } = this.props;
    const { handleOnUpdatePost, handleOnCreatePost } = this;
    const { openDialog = false } = toggleDialog || {};
    const fun = (toggleDialog, handleOnCreatePost, handleOnUpdatePost) => {
      if (toggleDialog.buttonName == "Create") {

        return this.handleOnCreatePost();
        debugger
      } else if (toggleDialog.buttonName == "Update") {
        return this.handleOnUpdatePost();
        debugger
      }
    };
    return (
      <div>
        <Grid container>
          <Grid item md={12} classes={{ root: "displaying" }}>
            <Dialog
              onClose={handleOnToggleDialog}
              aria-labelledby="simple-dialog-title"
              open={openDialog}
              fullWidth="true"
              maxWidth="md"
            >
              <DialogTitle id="simple-dialog-title">
                {toggleDialog.title}
                <li
                  class="material-icons"
                  style={{ float: "right" }}
                  onClick={() => this.handleClose()}
                >
                  clear
                </li>
              </DialogTitle>

              <TextField
                id="outlined-name"
                label="Post_Name"
                value={post.post_name}
                onChange={e =>
                  handleFieldChange("post_name", e.target.value, "post")
                }
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-name"
                label="Threshold"
                type="number"
                value={post.threshold}
                onChange={e =>
                  handleFieldChange("threshold", e.target.value, "post")
                }
                margin="normal"
                variant="outlined"
              />
              <Button
                color="primary"
                variant="contained"
                onClick={() =>
                  fun(
                    toggleDialog,
                    handleOnCreatePost,
                    handleOnPosts,
                    handleOnUpdatePost,
                    post
                  )
                }
              >
                {toggleDialog.buttonName}
              </Button>
            </Dialog>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = ({ posts, post, toggleDialog }) => {
  return {
    posts,
    post,
    toggleDialog
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleOnToggleDialog: (title, buttonName, index) => {
      dispatch(handleOnToggleDialog(title, buttonName, index));
    },
    handleOnPosts: (post, value) => {
      dispatch(handleOnPosts(post, value));
    },
    handleFieldChange: (property, property_value, propertyObj) => {
      dispatch(handleFieldChange(property, property_value, propertyObj));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Create_Update_Post));
