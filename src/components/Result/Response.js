import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

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
import axios from "axios";
import MaterialTable from "material-table";
class Response extends Component {
  state = {
    response: []
  };

  componentDidMount() {
    axios
      .get("https://pure-wave-01085.herokuapp.com/api/candidate_post_map")
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { response } = this.props;
    const columns = [
      {
        title: "Sr. No.",
        field: "index"
      },
      {
        title: "Question",
        field: "ques"
      },
      {
        title: "Rating",
        field: "rate"
      }
    ];
    const data = Object.keys(response).map((rspons, index) => ({
      index: index + 1,
      ques: response[index].ques,
      rate: response[index].rate
    }));
    return (
      <Grid container>
        <Grid item md={12} className="icon"></Grid>

        <Grid item md={1}></Grid>
        <Grid item md={10}>
          <Paper>
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
              title={
                <h5>
                  Users Rating
                  <img
                    src="https://img.icons8.com/doodle/48/000000/star--v2.png"
                    style={{ verticalAlign: "middle" }}
                  />
                </h5>
              }
              data={data}
              columns={columns}
            />
          </Paper>
        </Grid>
        <Grid item md={1}></Grid>
      </Grid>
    );
  }
}
const mapStateToProps = ({ response }) => {
  return {
    response
  };
};

export default connect(
  mapStateToProps,
  null
)(withRouter(Response));
