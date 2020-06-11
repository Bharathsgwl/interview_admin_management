import React from "react";
import "./index.css";
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
import Create_Update_Post from "./Create_Update_Post";
import MaterialTable from "material-table";
class Interview_Posts extends React.Component {
  deletePost = (e, uuid) => {
    debugger;
    const { questions } = this.props;
    axios
      .delete(`https://pure-wave-01085.herokuapp.com/api/post/${uuid}`)
      .then(result => {
        console.log(result.data);

        debugger;
      });
    return axios
      .get(`https://pure-wave-01085.herokuapp.com/api/post`)
      .then(response => console.log(response.data));
  };
  render() {
    const {
      handleOnPosts,
      posts,
      toggleDialog,
      handleOnToggleDialog,
      post
    } = this.props;
    const { deletePost } = this;
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
        title: "Post",
        field: "post_name"
      },
      {
        title: "Threshold",
        field: "threshold"
      },
      {
        title: "Created by",
        field: "created_by"
      },
      {
        title: "Updated by",
        field: "updated_by"
      },
      {
        title: "Edit",
        field: "action"
      }
    ];
    const data = Object.keys(posts).map((post, index) => ({
      index: index + 1,
      uuid: posts[index].uuid,
      post_name: posts[index].post_name,
      threshold: posts[index].threshold,
      created_by: posts[index].created_by,
      updated_by: posts[index].updated_by,
      action: (
        <div>
          <Button
            onClick={() => {
              handleOnToggleDialog("Update Post", "Update", index);
            }}
          >
            <Icon>edit</Icon>
          </Button>
          <Button onClick={e => deletePost(e, posts[index].uuid)}>
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
                handleOnToggleDialog("Create Post", "Create");
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
              title="Posts"
              data={data}
              columns={columns}
            />
          </Paper>
        </Grid>
        <Grid item md={1}></Grid>
        <Create_Update_Post />
      </Grid>
    );
  }
}
const mapStateToProps = ({ posts, toggleDialog, post }) => {
  return {
    posts,
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
)(withRouter(Interview_Posts));
// <Paper>
//   <Table>
//     <TableHead>
//       <TableRow>
//         <TableCell>Sr. No.</TableCell>
//         <TableCell>uuid</TableCell>
//         <TableCell>Post</TableCell>
//         <TableCell>Threshold</TableCell>
//         <TableCell>Created by</TableCell>
//         <TableCell>Created time</TableCell>
//         <TableCell>Updated by</TableCell>
//         <TableCell>Updated time</TableCell>
//         <TableCell>Edit </TableCell>
//       </TableRow>
//       {posts.map((post, index) => {
//         return (
//           <TableRow key={index}>
//             <TableCell>{index + 1}</TableCell>
//             <TableCell>{post.uuid}</TableCell>
//             <TableCell>{post.post_name}</TableCell>
//             <TableCell>{post.threshold}</TableCell>
//             <TableCell>{post.created_by}</TableCell>
//             <TableCell>{post.created_time}</TableCell>
//             <TableCell>{post.updated_by}</TableCell>
//             <TableCell>{post.updated_time}</TableCell>
//             <TableCell>
//               <Button
//                 color="primary"
//                 onClick={() => {
//                   handleOnToggleDialog(
//                     "Update Post",
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
//                 onClick={e => deletePost(e, post.uuid)}
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
