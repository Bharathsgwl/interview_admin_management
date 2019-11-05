import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import {
  Grid,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  Button,
  Input,
  InputLabel,
  InputBase,
  Icon
} from "@material-ui/core";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MaterialTable from "material-table";
class Result extends Component {
  state = {
    result: [],
    userId: null
  };

  uniqueResult = () => {
    const { userId } = this.state;
    if (userId != null) {
      axios
        .get(`https://pure-wave-01085.herokuapp.com/api/result/${userId}`)
        .then(response => {
          if (response.data.result.length == 0) {
            alert("Please enter a valid User ID");
          } else {
            this.setResult(response.data.result);
          }
        })
        .catch(err => console.log(err));
    }
  };

  handleChange = e => {
    this.setState({
      userId: e
    });
  };

  render() {
    const { handleChange, uniqueResult } = this;

    const { result_1 } = this.props;
    const { result = [], userId } = this.state;
    const columns = [
      {
        title: "Sr. No.",
        field: "index"
      },
      {
        title: "User Id",
        field: "r_user_id"
      },
      {
        title: "Marks",
        field: "marks"
      },
      {
        title: "Percnetage",
        field: "percentage"
      },
      {
        title: "Result",
        field: "result"
      }
    ];
    const data = Object.keys(result_1).map((result, index) => ({
      index: index + 1,
      uuid: result_1[index].uuid,
      r_user_id: result_1[index].r_user_id,
      marks: result_1[index].marks,
      percentage: result_1[index].percentage,
      result: result_1[index].result
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
              title="Candidate Result"
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
const mapStateToProps = ({ result_1 }) => {
  return {
    result_1
  };
};
export default connect(
  mapStateToProps,
  null
)(withRouter(Result));
