import React from "react";
import "./index.css"
import {
  Typography,
  Grid,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Button,
  Icon
} from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleOnPosts, handleOnToggleDialog } from "../../redux/actions";
import * as actionTypes from "../../redux/actions";
import axios from "axios";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Create_Update_Instruction from "./Create_Update_Instruction";
import MaterialTable from "material-table";
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
  //

  deleteInstruction = (e, uuid) => {
    debugger;
    axios
      .delete(`https://pure-wave-01085.herokuapp.com/api/exam_rules/${uuid}`)
      .then(result => {
        console.log(result.data);
        debugger;
      });
  };

  render() {
    const {
      handleOnPosts,
      instructions,
      toggleDialog,
      handleOnToggleDialog,
      post
    } = this.props;
    const { deleteInstruction = () => { } } = this;
    const columns = [
      {
        title: "Sr. No.",
        field: "index"
      },
      {
        title: "uuid",
        field: "uuid"
      },
      {
        title: "rule_name",
        field: "rule_name"
      },
      {
        title: "Priority",
        field: "priority"
      },
      {
        title: "Created by",
        field: "created_by"
      },
      {
        title: "Created time",
        field: "created_time"
      },
      {
        title: "Updated by",
        field: "updated_by"
      },
      {
        title: "Updated time",
        field: "updated_time"
      },
      {
        title: "Edit",
        field: "action"
      }
    ];
    const data = Object.keys(instructions).map((instruction, index) => ({
      index: index + 1,
      uuid: instructions[index].uuid,
      rule_name: instructions[index].rule_name,
      priority: instructions[index].priority,
      created_by: instructions[index].created_by,
      created_time: instructions[index].created_time,
      updated_by: instructions[index].updated_by,
      updated_time: instructions[index].updated_time,
      action: (
        <div>
          <Button
            onClick={() => {
              handleOnToggleDialog("Update Instruction", "Update", index);
            }}
          >
            <Icon>edit</Icon>
          </Button>
          <Button onClick={e => deleteInstruction(e, instructions[index].uuid)}>
            {" "}
            <Icon>delete</Icon>
          </Button>
        </div>
      )
    }));
    return (
      <Grid container>
        <Grid item md={11} xs={12} sm={12}>
          <Grid item md={12} xs={12} sm={12} style={{ textAlign: "end" }}>
            <AddCircleIcon
              button
              classes={{ root: "icon-style" }}
              dialog={toggleDialog}
              onClick={() => {
                handleOnToggleDialog("Create Instruction", "Create");
              }}
            />
          </Grid>
          <Paper>
            <Table>
              <TableCell></TableCell>
            </Table>
            <MaterialTable
              options={{
                search: true,
                rowStyle: {
                  backgroundColor: "#FFFFFF"
                },
                headerStyle: {
                  backgroundColor: "#EEEE"
                }
              }}
              title="Exam Rules"
              data={data}
              columns={columns}
            />
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
// <Paper>
//   <Table>
//     <TableHead>
//       <TableRow>
//         <TableCell>Sr. No.</TableCell>
//         <TableCell>uuid</TableCell>
//         <TableCell>rule_name</TableCell>
//         <TableCell>Priority</TableCell>
//         <TableCell>Created by</TableCell>
//         <TableCell>Created time</TableCell>
//         <TableCell>Updated by</TableCell>
//         <TableCell>Updated time</TableCell>
//         <TableCell>Edit </TableCell>
//       </TableRow>
//       {instructions.map((instruction, index) => {
//         return (
//           <TableRow key={index}>
//             <TableCell>{index + 1}</TableCell>
//             <TableCell>{instruction.uuid}</TableCell>
//             <TableCell>{instruction.rule_name}</TableCell>
//             <TableCell>{instruction.priority}</TableCell>
//             <TableCell>{instruction.created_by}</TableCell>
//             <TableCell>{instruction.created_time}</TableCell>
//             <TableCell>{instruction.updated_by}</TableCell>
//             <TableCell>{instruction.updated_time}</TableCell>
//             <TableCell>
//               <Button
//                 color="primary"
//                 onClick={() => {
//                   handleOnToggleDialog(
//                     "Update Instruction",
//                     "Update",
//                     index
//                   );
//                 }}
//               >
//                 {" "}
//                 Edit{" "}
//               </Button>
//               <Button
//                 color="primary"
//                 onClick={e => deleteInstruction(e, instruction.uuid)}
//               >
//                 {" "}
//                 Delete
//               </Button>
//             </TableCell>
//           </TableRow>
//         );
//       })}
//     </TableHead>
//   </Table>
// </Paper>
