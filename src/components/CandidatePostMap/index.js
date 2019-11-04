import React from "react";

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
import {
  handleOnCandidatePost,
  handleOnToggleDialog,
  handleOnPosts
} from "../../redux/actions";
import axios from "axios";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Create_Update_Post from "./Create_Update_Post";
import MaterialTable from "material-table";

class CandidatePostMap extends React.Component {
  // displayPosts = () => {
  //     let { handleOnPosts } = this.props;
  //     axios
  //         .get("https://tranquil-wildwood-09825.herokuapp.com/api/post")
  //         .then(response => {
  //             let post_s = response.data.posts.map(p => p);
  //             this.props.handleOnPosts("posts", post_s);
  //         });
  // };

  deleteCandidatePostMap = (e, uuid) => {
    axios
      .delete(
        `https://pure-wave-01085.herokuapp.com/api/candidate_post_map/${uuid}`
      )
      .then(result => {
        console.log(result.data);
      });
  };

  componentDidMount() {
    debugger;
    var { candidatePost_Map, candidates } = this.props;
    var { Selected_Users } = candidatePost_Map;

    axios
      .post(`https://evening-dawn-93464.herokuapp.com/api/select`, {
        role_name: "Candidate"
      })
      .then(response => {
        debugger;

        candidates = response.data.Selected_Users;
        this.props.handleOnPosts("candidates", candidates);
      });
    debugger;
  }

  render() {
    const { deleteCandidatePostMap } = this;
    const {
      handleOnCandidatePost,
      candidatePost,
      toggleDialog,
      handleOnToggleDialog,
      Selected_Users
    } = this.props;
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
        title: "User Id",
        field: "user_id"
      },
      {
        title: "Post Id",
        field: "post_id"
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
    const data = Object.keys(candidatePost).map((c_post, index) => ({
      index: index + 1,
      uuid: candidatePost[index].uuid,
      user_id: candidatePost[index].user_id,
      post_id: candidatePost[index].post_id,
      created_by: candidatePost[index].created_by,
      created_time: candidatePost[index].created_time,
      updated_by: candidatePost[index].updated_by,
      updated_time: candidatePost[index].updated_time,
      action: (
        <div>
          <Button
            onClick={() => {
              handleOnToggleDialog("CandidatePostMap", "Update", index);
            }}
          >
            <Icon>edit</Icon>
          </Button>
          <Button
            onClick={e => deleteCandidatePostMap(e, candidatePost[index].uuid)}
          >
            {" "}
            <Icon>delete</Icon>
          </Button>
        </div>
      )
    }));
    return (
      <Grid container>
        <Grid item md={12} className="icon">
          <AddCircleIcon
            button
            style={{ fontSize: 40, color: "gray" }}
            dialog={toggleDialog}
            onClick={() => {
              handleOnToggleDialog("CandidatePostMap", "Create");
            }}
          />
        </Grid>
        <Grid item md={1}></Grid>
        <Grid item md={10}>
          <Paper>
            <TableCell></TableCell>

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
              title="CandidatePostMap"
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

const mapStateToProps = ({
  candidatePost,
  toggleDialog,
  candidatePost_Map,
  candidates
}) => {
  return {
    candidatePost,
    toggleDialog,
    candidates,
    candidatePost_Map
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleOnCandidatePost: (candidatePost, postMapValue) => {
      dispatch(handleOnCandidatePost(candidatePost, postMapValue));
    },
    handleOnToggleDialog: (title, buttonName, index) => {
      dispatch(handleOnToggleDialog(title, buttonName, index));
    },
    handleOnPosts: (post, value) => {
      dispatch(handleOnPosts(post, value));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CandidatePostMap));
