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
  DialogActions,
  OutlinedInput
} from "@material-ui/core";
import {
  handleOnToggleDialog,
  handleFieldChange,
  handleOnCandidatePost
} from "../../../redux/actions";
import * as actionTypes from "../../../redux/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
class Create_Update_Post extends React.Component {
  handleOnCreateCandidatePost = () => {
    var { candidatePost_Map } = this.props;
    const uuid1 = require("uuid/v4");
    axios
      .post("https://pure-wave-01085.herokuapp.com/api/candidate_post_map", {
        uuid: uuid1(),
        post_id: candidatePost_Map.post_id,
        user_id: candidatePost_Map.user_id,
        created_by: "GWLADMIN124"
      })
      .then(response => {
        console.log(response.data, "res");
      });
    this.props.handleOnToggleDialog();
  };
  handleOnUpdateCandidatePost = () => {
    var { candidatePost_Map } = this.props;
    var { uuid, post_id, user_id } = candidatePost_Map;
    debugger;
    axios
      .put(`https://pure-wave-01085.herokuapp.com/api/candidate_post_map`, {
        uuid: uuid,
        user_id: user_id,
        post_id: post_id,
        updated_by: "Bharath"
      })
      .then(response => {
        debugger;
        console.log(response.data, "res");
        debugger;
      });
    this.props.handleOnToggleDialog();
  };
  handleClose = () => {
    this.props.handleOnToggleDialog();
  };
  render() {
    const {
      candidatePost_Map = {},
      handleFieldChange,
      roleList = [],
      userRoles,
      toggleDialog,
      handleOnToggleDialog,
      handleOnCandidatePost,
      candidatePost,
      posts,
      candidates
    } = this.props;

    console.log(candidates, "User");

    const { handleOnUpdateCandidatePost, handleOnCreateCandidatePost } = this;
    const { openDialog = false } = toggleDialog || {};
    const fun = (
      toggleDialog,
      handleOnCreateCandidatePost,
      handleOnUpdateCandidatePost
    ) => {
      if (toggleDialog.buttonName == "Create") {
        return this.handleOnCreateCandidatePost();
        debugger;
      } else if (toggleDialog.buttonName == "Update") {
        return this.handleOnUpdateCandidatePost();
        debugger;
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
              // fullWidth="true"
              // maxWidth="md"
            >
              <DialogContent style={{ width: 332 }}>
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
                <Typography>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-age-simple">Post</InputLabel>
                    <Select
                      classes={{ root: "selectWidth" }}
                      value={this.props.candidatePost_Map.post_id}
                      onChange={e => {
                        handleFieldChange(
                          "post_id",
                          e.target.value,
                          "candidatePost_Map"
                        );
                      }}
                      input={<OutlinedInput id="outlined-age-simple" />}
                    >
                      {posts.map((post, index) => {
                        return (
                          <MenuItem key={post.uuid} value={post.uuid}>
                            {post.post_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Typography>
                <br/>
                <Typography>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-age-simple">
                      Candidate
                    </InputLabel>
                    <Select
                      classes={{ root: "selectWidth" }}
                      value={this.props.candidatePost_Map.user_id}
                      onChange={e => {
                        handleFieldChange(
                          "user_id",
                          e.target.value,
                          "candidatePost_Map"
                        );
                      }}
                      input={<OutlinedInput id="outlined-age-simple" />}
                    >
                      {candidates.map((user, index) => {
                        return (
                          <MenuItem key={user.uuid} value={user.uuid}>
                            {user.user_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Typography>
                <DialogActions>
                  <Button
                    color="primary"
                    variant="contained"
                    classes={{ root: "buttonStyle" }}
                    onClick={() =>
                      fun(
                        toggleDialog,
                        handleOnCreateCandidatePost,
                        handleOnCandidatePost,
                        handleOnUpdateCandidatePost,
                        candidatePost
                      )
                    }
                  >
                    {toggleDialog.buttonName}
                  </Button>
                </DialogActions>
              </DialogContent>
              {/* <TextField
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
              /> */}
            </Dialog>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = ({
  posts,
  post,
  toggleDialog,
  candidatePost_Map,
  candidatePost,
  Selected_Users,
  candidates
}) => {
  return {
    posts,
    post,
    toggleDialog,
    candidatePost_Map,
    candidatePost,
    Selected_Users,
    candidates
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleOnToggleDialog: (title, buttonName, index) => {
      dispatch(handleOnToggleDialog(title, buttonName, index));
    },
    handleOnCandidatePost: (candidatePost, postMapValue) => {
      dispatch(handleOnCandidatePost(candidatePost, postMapValue));
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
