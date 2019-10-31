import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
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
class Response extends Component {
  state = {
    result: []
  }

  componentDidMount() {

    axios
      .get(
        "http://localhost:8086/api/response",

      )
      .then(response => {
        this.setResult(response.data.result);
      })
      .catch(err => console.log(err));
  }
  setResult = result => {
    this.setState({ result })
    console.log(result, "resultssss");
  }






  render() {

    const { result = [] } = this.state;
    return (<div>
      <Card style={{ color: "black" }}><h2 style={{ marginLeft: "40%" }}>Users Rating<img src="https://img.icons8.com/doodle/48/000000/star--v2.png" /></h2></Card>


      <Grid container>
        <Grid item md={12} className="icon">

        </Grid>

        <Grid item md={1}></Grid>
        <Grid item md={10}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow >
                  <TableCell style={{ color: 'black' }}>Sr. No.</TableCell>
                  <TableCell style={{ color: 'black' }}>Question</TableCell>
                  <TableCell style={{ color: 'black' }}>Rating</TableCell>


                </TableRow>
                {result.map((result, index1) => {
                  return (
                    <TableRow key={index1}>
                      <TableCell>{index1 + 1}</TableCell>
                      <TableCell>{result.ques}</TableCell>
                      <TableCell>{result.rate}</TableCell>



                    </TableRow>
                  );
                })}
              </TableHead>
            </Table>
          </Paper>
        </Grid>
        <Grid item md={1}></Grid>

      </Grid></div>
    );
  }

}
const mapStateToProps = ({ response }) => {
  return {
    response
  };
};

export default connect(mapStateToProps, null)(withRouter(Response));