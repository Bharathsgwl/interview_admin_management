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
  IconButton,
  DialogContent,
  DialogActions,
  OutlinedInput
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {
  handleOnToggleDialog,
  handleFieldChangeNumber,
  handleFieldChange,
  handleOnQuestions,
  handleOnChangeOption
} from "../../../redux/actions";
import * as actionTypes from "../../../redux/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Create_Update_questions extends React.Component {
  state = {
    textAre: "",
    element: 0,
    textArea: []
  };

  handleOnCreate = () => {
    const { toggleDialog, questions } = this.props;
    var { openDialog } = toggleDialog;
    var { textArea } = this.state;
    var { question } = this.props;

    var arr1 = question.options.toString();
    var arr2 = JSON.stringify(arr1);
    var arr3 = arr2.replace(/"/, "{").replace(/"/, "}");
    const uuid = require("uuidv4").default;

    axios
      .post("https://pure-wave-01085.herokuapp.com/api/question_section", {
        q_uuid: uuid(),
        post_id: question.post_id,
        q_name: question.q_name,
        options: arr3,
        q_answer: question.q_answer,
        has_option: true,
        q_comment: null,
        created_by: "GWLADMIN124",
        timer: question.timer
      })
      .then(response => {
        console.log(response.data, "res");
      });
    this.props.handleOnToggleDialog();
    debugger;
  };
  handleClose = () => {
    this.props.handleOnToggleDialog();
  };

  render() {
    const {
      handleFieldChange,
      toggleDialog,
      handleOnToggleDialog,
      posts,
      index,
      question,
      questions,
      handleFieldChangeNumber,
      handleOnChangeOption
    } = this.props;
    var { option, options_array, o_index, textArea } = this.state;
    const { openDialog = false } = toggleDialog || {};

    const { handleOnCreate, handleOnUpdate = () => {} } = this;
    debugger;

    var { q_uuid } = questions;

    const { post_id, options, id } = question;
    const fun = (
      toggleDialog,
      handleOnCreate,
      handleOnQuestions,
      handleOnUpdate,
      question
    ) => {
      var question_s = [];
      debugger;
      if (toggleDialog.buttonName == "CREATE") {
        debugger;
        return this.handleOnCreate();
      } else if (toggleDialog.buttonName == "Update") {
        var arr1 = question.options.toString();

        var arr2 = JSON.stringify(arr1);

        var arr3 = arr2.replace(/"/, "{").replace(/"/, "}");
        axios
          .put(`https://pure-wave-01085.herokuapp.com/api/question_section`, {
            q_uuid: questions[question.index].q_uuid,
            post_id: question.post_id,
            q_name: question.q_name,
            options: arr3,
            has_option: question.has_option,
            q_answer: question.q_answer,
            timer: question.timer,
            updated_by: "bharath"
          })
          .then(response => {
            console.log(response.data.questions);

            axios
              .get("https://pure-wave-01085.herokuapp.com/api/question_section")
              .then(response => {
                question_s = response.data.questions.map(q => q);
              });
          });
        this.props.handleOnToggleDialog();
      }
    };

    return (
      <div>
        <Grid container>
          <Grid item md={12} classes={{ root: "displaying" }}>
            <Dialog
              onClose={handleOnToggleDialog}
              aria-labelledby="alert-dialog-title"
              open={openDialog}
            >
              <DialogContent style={{ width: 350 }}>
                <DialogTitle
                  style={{ width: "-webkit-fill-available" }}
                  id="simple-dialog-title"
                  onClose={this.handleClose}
                >
                  {toggleDialog.title}{" "}
                  <li
                    type="button"
                    class="material-icons"
                    style={{ float: "right" }}
                    onClick={() => this.handleClose()}
                  >
                    clear
                  </li>
                </DialogTitle>
                <Typography>
                  <FormControl variant="outlined">
                    <InputLabel
                      ref={ref => {
                        this.InputLabelRef = ref;
                      }}
                      htmlFor="outlined-posts-simple"
                    >
                      posts
                    </InputLabel>
                    <Select
                      classes={{ root: "selectWidth" }}
                      value={question.post_id}
                      onChange={e => {
                        handleFieldChange(
                          "post_id",
                          e.target.value,
                          "question"
                        );
                      }}
                      input={
                        <OutlinedInput
                          labelWidth={0}
                          name="post_id"
                          id="outlined-post_id-simple"
                        />
                      }
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
                <Typography>
                  <TextField
                    id="outlined-multiline-flexible"
                    multiline
                    rowsMax="5"
                    label="Question_Name"
                    value={question.q_name}
                    onChange={e =>
                      handleFieldChange("q_name", e.target.value, "question")
                    }
                    classes={{ root: "textwidth" }}
                    margin="normal"
                    variant="outlined"
                  />
                </Typography>
                <Typography>
                  <TextField
                    variant="outlined"
                    type="number"
                    classes={{ root: "textwidth" }}
                    label="Number of options"
                    value={question.options.length}
                    onChange={e => {
                      handleFieldChangeNumber(e.target.value);
                    }}
                  />
                </Typography>
                {question.options.map((val, ind) => {
                  return (
                    <div key={ind}>
                      {
                        <Typography>
                          <TextField
                            id="outlined-name"
                            classes={{ root: "textwidth" }}
                            label="options"
                            value={question.options[ind]}
                            onChange={e => {
                              handleOnChangeOption(ind, e.target.value);
                            }}
                            margin="normal"
                            variant="outlined"
                          />
                        </Typography>
                      }
                    </div>
                  );
                })}
                <Typography>
                  <TextField
                    id="outlined-name"
                    label="Answer"
                    value={question.q_answer}
                    classes={{ root: "textwidth" }}
                    onChange={e =>
                      handleFieldChange("q_answer", e.target.value, "question")
                    }
                    margin="normal"
                    variant="outlined"
                  />
                </Typography>
                <Typography>
                  <TextField
                    id="outlined-name"
                    label="Timer"
                    type="number"
                    value={question.timer}
                    classes={{ root: "textwidth" }}
                    onChange={e =>
                      handleFieldChange("timer", e.target.value, "question")
                    }
                    margin="normal"
                    variant="outlined"
                  />
                </Typography>
                <DialogActions>
                  <Button
                    color="primary"
                    variant="contained"
                    classes={{ root: "buttonStyle" }}
                    onClick={() =>
                      fun(
                        toggleDialog,
                        handleOnCreate,
                        handleOnQuestions,
                        handleOnUpdate,
                        question
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

const mapStateToProps = ({ question, posts, toggleDialog, questions }) => {
  return {
    posts,
    toggleDialog,
    questions,
    question
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleOnToggleDialog: (title, buttonName, index) => {
      dispatch(handleOnToggleDialog(title, buttonName, index));
    },
    handleFieldChange: (property, property_value, propertyObj) => {
      dispatch(handleFieldChange(property, property_value, propertyObj));
    },
    handleOnQuestions: (question, val) => {
      dispatch(handleOnQuestions(question, val));
    },
    handleFieldChangeNumber: number => {
      dispatch(handleFieldChangeNumber(number));
    },
    handleOnChangeOption: (o_index, val_ue) => {
      dispatch(handleOnChangeOption(o_index, val_ue));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Create_Update_questions));
