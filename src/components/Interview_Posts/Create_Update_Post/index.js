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
  MenuItem,
  DialogContent,
  DialogActions
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
    const uuid1 = require("uuidv4").default;

    axios
      .post("https://pure-wave-01085.herokuapp.com/api/post", {
        uuid: uuid1(),
        post_name: post.post_name,
        threshold: post.threshold,
        created_by: "GWLADMIN124"
      })
      .then(response => {
        console.log(response.data, "res");
      });
    this.props.handleOnToggleDialog();
  };
  handleOnUpdatePost = () => {
    var { post } = this.props;
    var { uuid, post_name, threshold } = post;

    debugger;
    axios
      .put(`https://pure-wave-01085.herokuapp.com/api/post`, {
        post_name: post_name,
        threshold: threshold,
        updated_by: "GWLADMIN124",
        uuid: uuid
      })
      .then(response => {
        debugger;

        debugger;
      });
    this.props.handleOnToggleDialog();
  };
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
        debugger;
      } else if (toggleDialog.buttonName == "Update") {
        return this.handleOnUpdatePost();
        debugger;
      }
    };
    return (
      <div>
        <Grid container>
          <Grid item md={12}>
            <Dialog
              onClose={handleOnToggleDialog}
              aria-labelledby="simple-dialog-title"
              open={openDialog}
            >
              <DialogContent style={{ width: 350 }}>
                <Typography>
                  <DialogTitle id="simple-dialog-title">
                    {toggleDialog.title}
                    <li
                      type="button"
                      class="material-icons"
                      style={{ float: "right", cursor: "pointer" }}
                      onClick={() => this.handleClose()}
                    >
                      clear
                    </li>
                  </DialogTitle>
                </Typography>
                <Typography>
                  <TextField
                    id="outlined-name"
                    label="Post_Name"
                    value={post.post_name}
                    classes={{ root: "textwidth" }}
                    onChange={e =>
                      handleFieldChange("post_name", e.target.value, "post")
                    }
                    margin="normal"
                    variant="outlined"
                  />
                </Typography>
                <Typography>
                  <TextField
                    id="outlined-name"
                    label="Threshold"
                    type="number"
                    value={post.threshold}
                    classes={{ root: "textwidth" }}
                    onChange={e =>
                      handleFieldChange("threshold", e.target.value, "post")
                    }
                    margin="normal"
                    variant="outlined"
                  />
                </Typography>
                <Typography>
                  <DialogActions>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ margin: "auto" }}
                      classes={{ root: "buttonStyle" }}
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
                  </DialogActions>
                </Typography>
              </DialogContent>
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
