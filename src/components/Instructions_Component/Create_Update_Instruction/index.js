  import React from "react";

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
  Icon,
  DialogContent,
  DialogActions,
  OutlinedInput
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
import "./index.css";
class Create_Update_Instruction extends React.Component {
  handleOnCreateInstruction = () => {
    debugger;
    var { instruction } = this.props;
    const uuid = require("uuidv4").default;
    debugger;
    axios
      .post("https://pure-wave-01085.herokuapp.com/api/exam_rules", {
        uuid: uuid(),
        rule_name: instruction.rule_name,
        priority: instruction.priority,
        created_by: "Bharath"
      })
      .then(response => {
        console.log(response.data, "res");
        debugger;
      });
    debugger;
    this.props.handleOnToggleDialog();
  };
  handleOnUpdateInstruction = () => {
    var { instruction } = this.props;
    var { uuid, rule_name, priority } = instruction;

    debugger;
    axios
      .put(`https://pure-wave-01085.herokuapp.com/api/exam_rules`, {
        rule_name: rule_name,
        priority: priority,
        updated_by: "GWLADMIN124",
        uuid: uuid
      })
      .then(response => {
        debugger;
        console.log(response.data, "res");
        debugger;
      });
    debugger
    this.props.handleOnToggleDialog();
  };

  handleClose = () => {
    this.props.handleOnToggleDialog();
  };

  render() {
    const {
      post = {},
      handleFieldChange = {},
      roleList = [],
      userRoles,
      toggleDialog,
      handleOnToggleDialog,
      handleOnPosts,
      instruction = {},
      instructions = [],
      priority1
    } = this.props;

    const { priority } = handleFieldChange;
    const { handleOnUpdateInstruction, handleOnCreateInstruction } = this;
    const { openDialog = false } = toggleDialog || {};
    const fun = (
      toggleDialog,
      handleOnCreateInstruction,
      handleOnUpdateInstruction
    ) => {
      if (toggleDialog.buttonName == "Create") {
        return this.handleOnCreateInstruction();
        debugger;
      } else if (toggleDialog.buttonName == "Update") {
        return this.handleOnUpdateInstruction();
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
            >
              <DialogContent style={{ width: 350 }}>
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
                  <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  rowsMax="5"
                    label="Rule Name"
                    value={instruction.rule_name}
                    classes={{ root: "textwidth" }}
                    onChange={e =>
                      handleFieldChange(
                        "rule_name",
                        e.target.value,
                        "instruction"
                      )
                    }
                    margin="normal"
                    variant="outlined"
                  />
                </Typography>

                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-age-simple">
                    priority
                  </InputLabel>
                  <Select
                    value={instruction.priority}
                    classes={{ root: "selectWidth" }}
                    onChange={e => {
                      handleFieldChange(
                        "priority",
                        e.target.value,
                        "instruction"
                      );
                    }}
                    input={<OutlinedInput id="outlined-age-simple" />}
                  >
                    {priority1.map((pr, index) => {
                      return (
                        <MenuItem key={index} value={pr}>
                          {pr}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <DialogActions>
                  <Button
                    color="primary"
                    variant="contained"
                    classes={{ root: "buttonStyle" }}
                    onClick={() =>
                      fun(
                        toggleDialog,
                        handleOnCreateInstruction,
                        handleOnPosts,
                        handleOnUpdateInstruction,
                        post
                      )
                    }
                  >
                    {toggleDialog.buttonName}
                  </Button>
                </DialogActions>
              </DialogContent>
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
  instruction,
  instructions,
  priority1
}) => {
  return {
    posts,
    post,
    toggleDialog,
    instruction,
    instructions,
    priority1
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
)(withRouter(Create_Update_Instruction));
