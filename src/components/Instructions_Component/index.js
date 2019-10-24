import React from "react";

import {
  Typography,
  Grid,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Button
} from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleOnPosts, handleOnToggleDialog } from "../../redux/actions";
import * as actionTypes from "../../redux/actions";
import axios from "axios";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Create_Update_Instruction from './Create_Update_Instruction';
import SpinnerComponent from "../SpinnerComponent";
class Instructions_Component extends React.Component {
  // displayPosts(){
  // let {handleOnPosts}=this.props;
  //     axios
  //       .get("https://tranquil-wildwood-09825.herokuapp.com/api/post")
  //       .then(response => {
  //       let  post_s = response.data.posts;
  //         this.props.handleOnPosts("posts", post_s);
  //       });
  //   }4
  // deletePost = (e, uuid) => {
  //   debugger;
  //   const { questions } = this.props;
  //   axios.delete(`http://localhost:8080/api/post/${uuid}`).then(result => {
  //     console.log(result.data);
  //     axios.delete("http://localhost:8080/api/post").then(response => {
  //       console.log(response.data);
  //     });
  //     debugger;
  //   });
  //   return axios.get(`http://localhost:8080/api/post`).then(response=>console.log(response.data))
  // };

  deleteInstruction = (e, uuid) => {
    debugger;
    axios.delete(`http://localhost:8080/api/exam_rules/${uuid}`).then(result => {
        console.log(result.data);
        debugger;
    });
    // return axios.get(`https://tranquil-wildwood-09825.herokuapp.com/api/candidate_post_map`).then(response=>console.log(response.data))
};

  render() {
    const {
      handleOnPosts,
      instructions,
      toggleDialog,
      handleOnToggleDialog,
      post

    } = this.props;
    const {   deleteInstruction=()=>{} } = this;
    console.log(instructions,"instructions");

    return (
      <Grid container>
        <Grid item md={12} className="icon">
          <AddCircleIcon
            button
            style={{ fontSize: 40, color: "gray" }}
            dialog={toggleDialog}
            onClick={() => {
              handleOnToggleDialog("Create Instruction", "Create");
            }}
          />
        </Grid>
        <Grid item md={1}></Grid>
        <Grid item md={10}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>uuid</TableCell>
                  <TableCell>rule_name</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Created by</TableCell>
                  <TableCell>Created time</TableCell>
                  <TableCell>Updated by</TableCell>
                  <TableCell>Updated time</TableCell>
                  <TableCell>Edit </TableCell>
                </TableRow>
                {instructions.map((instruction, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{instruction.uuid}</TableCell>
                      <TableCell>{instruction.rule_name}</TableCell>
                      <TableCell>{instruction.priority}</TableCell>
                      <TableCell>{instruction.created_by}</TableCell>
                      <TableCell>{instruction.created_time}</TableCell>
                      <TableCell>{instruction.updated_by}</TableCell>
                      <TableCell>{instruction.updated_time}</TableCell>
                      <TableCell>
                        <Button
                          color="primary"
                          onClick={() => {
                            handleOnToggleDialog(
                              "Update Instruction",
                              "Update",
                              index
                            );
                          }}
                        >
                          {" "}
                          Edit{" "}
                        </Button>
                        <Button
                          color="primary"
                          onClick={e => deleteInstruction(e, instruction.uuid)}
                        >
                          {" "}
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableHead>
            </Table>
          </Paper>
        </Grid>
        <Grid item md={1}></Grid>
<Create_Update_Instruction />
      </Grid>
    );
  }
}
const mapStateToProps = ({ instructions, toggleDialog, post }) => {
  return {
    instructions,
    toggleDialog
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleOnPosts: (post, value) => {
      dispatch(handleOnPosts(post, value));
    },
    handleOnToggleDialog: (title, buttonName, index) => {
      dispatch(handleOnToggleDialog(title, buttonName, index));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Instructions_Component));

//
