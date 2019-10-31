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
class Create_Update_Instruction extends React.Component {
  handleOnCreateInstruction = () => {
    debugger
    var { instruction } = this.props;
    const uuid = require("uuidv4").default;
    debugger
    axios
      .post("http://localhost:8086/api/exam_rules", {
        uuid: uuid(),
        rule_name: instruction.rule_name,
        priority: instruction.priority,
        created_by: "GWLADMIN124"
      })
      .then(response => {
        console.log(response.data, "res");
        debugger
      });
    debugger
    this.props.handleOnToggleDialog();
  };
  handleOnUpdateInstruction = () => {
    var { instruction } = this.props;
    var { uuid, rule_name, priority } = instruction;
    console.log("APMAN", uuid, rule_name, priority);
    debugger
    axios.put(`http://localhost:8086/api/exam_rules`, {
      rule_name: rule_name,
      priority: priority,
      updated_by: "GWLADMIN124",
      uuid: uuid
    })
      .then(response => {
        debugger;
        console.log(response.data, "res");
        debugger;
      })
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
    console.log("inst", instruction);

    const { priority } = handleFieldChange;
    const { handleOnUpdateInstruction, handleOnCreateInstruction } = this;
    const { openDialog = false } = toggleDialog || {};
    const fun = (toggleDialog, handleOnCreateInstruction, handleOnUpdateInstruction) => {
      if (toggleDialog.buttonName == "Create") {

        return this.handleOnCreateInstruction();
        debugger
      } else if (toggleDialog.buttonName == "Update") {
        return this.handleOnUpdateInstruction();
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
                label="Rule Name"
                value={instruction.rule_name}
                onChange={e =>
                  handleFieldChange("rule_name", e.target.value, "instruction")
                }
                margin="normal"
                variant="outlined"
              />
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-simple">priority</InputLabel>
                <Select
                  value={instruction.priority}
                  onChange={e => {
                    handleFieldChange("priority", e.target.value, "instruction");
                  }}
                  input={<Input id="select-multiple" />}
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
              <Button
                color="primary"
                variant="contained"
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
            </Dialog>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = ({ posts, post, toggleDialog, instruction, instructions, priority1 }) => {
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
