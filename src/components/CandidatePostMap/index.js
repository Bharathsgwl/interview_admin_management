import React from 'react';

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
import { handleOnCandidatePost, handleOnToggleDialog, handleOnPosts } from "../../redux/actions";
import axios from "axios";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Create_Update_Post from "./Create_Update_Post";


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
        axios.delete(`http://localhost:8080/api/candidate_post_map/${uuid}`).then(result => {
            console.log(result.data);
        });
        // return axios.get(`https://tranquil-wildwood-09825.herokuapp.com/api/candidate_post_map`).then(response=>console.log(response.data))
    };

    componentDidMount() {
        debugger;
        axios
            .post(`https://evening-dawn-93464.herokuapp.com/api/select`, {
                role_name: "Candidate"
            })
            .then(response => {
                debugger;
                console.log("response123", response);

            })
        debugger;
        axios
            .get("https://tranquil-wildwood-09825.herokuapp.com/api/post")
            .then(response => {
                let post_s = response.data.posts.map(p => p);
                this.props.handleOnPosts("posts", post_s);
            });

    }

    render() {
        console.log(this.props.candidatePost, "candidate");
        const { deleteCandidatePostMap } = this;
        const {
            handleOnCandidatePost,
            candidatePost,
            toggleDialog,
            handleOnToggleDialog
        } = this.props;
        return (
            <Grid container>
                <Grid item md={12} className="icon">
                    <AddCircleIcon
                        button
                        style={{ fontSize: 40, color: "gray" }}
                        dialog={toggleDialog}
                        onClick={() => {
                            handleOnToggleDialog("Create CandidatePostMap", "Create");
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
                                    <TableCell>User ID</TableCell>
                                    <TableCell>Post ID</TableCell>
                                    <TableCell>Created by</TableCell>
                                    <TableCell>Created time</TableCell>
                                    <TableCell>Updated by</TableCell>
                                    <TableCell>Updated time</TableCell>
                                    <TableCell>Edit </TableCell>
                                </TableRow>
                                {candidatePost.map((each, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{each.uuid}</TableCell>
                                            <TableCell>{each.user_id}</TableCell>
                                            <TableCell>{each.post_id}</TableCell>
                                            <TableCell>{each.created_by}</TableCell>
                                            <TableCell>{each.created_time}</TableCell>
                                            <TableCell>{each.updated_by}</TableCell>
                                            <TableCell>{each.updated_time}</TableCell>
                                            <TableCell>
                                                <Button
                                                    color="primary"
                                                    onClick={() => {
                                                        handleOnToggleDialog(
                                                            "Update CandidatePostMap",
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
                                                    onClick={e => deleteCandidatePostMap(e, each.uuid)}
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
                <Create_Update_Post />
            </Grid>
        );
    }
}

const mapStateToProps = ({ candidatePost, toggleDialog }) => {
    return {
        candidatePost,
        toggleDialog
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CandidatePostMap));
