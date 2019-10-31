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
  // handleChange = (e, index) => {
  //   var { textAre, textArea, element } = this.state;
  //   var { question } = this.props;
  //   textArea[index] = e;
  //   question.options = textArea;
  //   this.setState({
  //     textArea,
  //     options
  //   });
  //   console.log(textArea);
  //   console.log(options, "reducer_options");
  // };
  // handleFieldChangeNumber = e => {
  //   var { element } = this.state;
  //
  //   this.setState({
  //     element: e
  //   });
  //   // console.log(textAre)
  // };

  handleOnCreate = () => {
    const { toggleDialog, questions } = this.props;
    var { openDialog } = toggleDialog;
    var { textArea } = this.state;
    var { question } = this.props;

    var arr1 = question.options.toString();
    var arr2 = JSON.stringify(arr1);
    var arr3 = arr2.replace(/"/, "{").replace(/"/, "}");
    const uuid = require("uuidv4").default;
    console.log(arr3, "finalJson");

    axios
      .post("https://still-basin-05792.herokuapp.com/api/question_section", {
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
  handleClose=()=>{
    this.props.handleOnToggleDialog();
  }

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

        console.log(arr3, "final");

        debugger;
        console.log(
          questions[question.index].q_uuid,
          question.index,
          questions
        );
        axios
          .put(`https://still-basin-05792.herokuapp.com/api/question_section`, {
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
              .get(
                "https://still-basin-05792.herokuapp.com/api/question_section"
              )
              .then(response => {
                question_s = response.data.posts.map(q => q);
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
              fullWidth='true'
            maxWidth='md'
              aria-labelledby="alert-dialog-title"
              open={openDialog}
            >
              <DialogTitle style={{ width: "-webkit-fill-available" }}>
                {toggleDialog.title} <li class="material-icons" style={{float: "right"}} onClick={()=>this.handleClose()}>clear</li>
              </DialogTitle>

              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-simple">Posts</InputLabel>
                <Select
                  value={question.post_id}
                  onChange={e => {
                    handleFieldChange("post_id", e.target.value, "question");
                  }}
                  input={<Input id="select-multiple" />}
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

              <TextField
                id="outlined-name"
                label="Question_Name"
                value={question.q_name}
                onChange={e =>
                  handleFieldChange("q_name", e.target.value, "question")
                }
                margin="normal"
                variant="outlined"
              />
              <TextField
                type="number"
                label="Number of options"
                value={question.options.length}
                onChange={e => {
                  handleFieldChangeNumber(e.target.value);
                }}
              />
              {question.options.map((val, ind) => {
                return (
                  <div key={ind}>
                    {
                      <TextField
                        id="outlined-name"
                        label="options"
                        value={question.options[ind]}
                        onChange={e => {
                          handleOnChangeOption(ind, e.target.value);
                        }}
                        margin="normal"
                        variant="outlined"
                      />
                    }
                  </div>
                );
              })}

              <TextField
                id="outlined-name"
                label="Answer"
                value={question.q_answer}
                onChange={e =>
                  handleFieldChange("q_answer", e.target.value, "question")
                }
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-name"
                label="Timer"
                type="number"
                value={question.timer}
                onChange={e =>
                  handleFieldChange("timer", e.target.value, "question")
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
                    handleOnCreate,
                    handleOnQuestions,
                    handleOnUpdate,
                    question
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
