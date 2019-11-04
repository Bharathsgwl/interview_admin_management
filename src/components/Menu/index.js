import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  handleDrawerOpen,
  handleDrawerClose,
  handleOnPostClick,
  handleOnQuestionClick,
  handleOnCandidatePostClick,
  handleOnResultClick,
  handleOnPosts, handleOnQuestions, handleOnInstructionClick,
  handleOnCandidatePost,
  handleAuthenticaton, handleOnResponseClick
} from "../../redux/actions";
import Instructions_Component from "../Instructions_Component";
import Interview_Posts from "../Interview_Posts";
import Question_section from "../Question_section";
import CandidatePostMap from "../CandidatePostMap/index";
import Result from "../Result/Result";
import Response from "../Result/Response";
import axios from "axios";
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 4
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "80px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 5
  },
  nested: {
    paddingLeft: 45
  }
}));

const Menu = props => {
  debugger;
  const {
    open,
    handleDrawerOpen,
    handleDrawerClose,
    handleOnPostClick = () => { },
    handleOnCandidatePostClick = () => { },
    handleOnQuestionClick = () => { },
    handleOnResponseClick = () => { },

    handleOnInstructionClick = () => { },
    // onClickLogout,
    history,
    actionList,
    setHandleUserManagementAction,
    setSnackbarMessage,
    handleAuthenticaton = () => { }
  } = props;
  debugger;
  const classes = useStyles();
  const theme = useTheme();

  const getComponent = componentName => {
    if (componentName) {
      import(`./${componentName}`).then(module => {

        return { Component: module.default };
      });
    }
    return {};
  };

  // const handleValidation = () => {
  //   axios
  //     .post(`https://evening-dawn-93464.herokuapp.com/api/verify`, {
  //       "auth_token": sessionStorage.getItem("auth_token");
  //     })
  //     .then(response => {
  //       console.log("auth resp", response.data);

  //     })
  // };

  const onClickLogout = () => {
    axios.put(`https://evening-dawn-93464.herokuapp.com/api/logout`, {
      "auth_token": sessionStorage.getItem('auth_token')
    })
      .then(response => {
        sessionStorage.clear()
        if (!response.data.isloggedIn) {
          // redirect=true
          history.push("/")
        }
      })
      .catch(error => console.log(error)
      )
  }

  const displayPosts = () => {
    let { handleOnPosts, history } = props;
    axios
      .get("https://pure-wave-01085.herokuapp.com/api/post")
      .then(response => {
        let post_s = response.data.posts.map(p => p);
        props.handleOnPosts("posts", post_s);
      });
    return (handleAuthenticaton(history), handleOnPostClick(history));
  };

  const displayInstructions = () => {
    var { handleOnQuestions, history, instructions } = props;
    let instruction_s = [];
    axios
      .get("https://pure-wave-01085.herokuapp.com/api/exam_rules")
      .then(response => {
        instruction_s = response.data.exam_rules.map(q => q);
        props.handleOnQuestions("instructions", instruction_s);
      });
    return (handleAuthenticaton(history), handleOnInstructionClick(history));
  };

  const displayQuestions = () => {
    var { handleOnQuestions, history, questions } = props;
    let question_s = [];
    axios
      .get("https://pure-wave-01085.herokuapp.com/api/question_section")
      .then(response => {
        console.log(response.data,"responsequesion")
        question_s = response.data.questions.map(q => q);
        props.handleOnQuestions("questions", question_s);
      });
    return (handleAuthenticaton(history), handleOnQuestionClick(history));
  };

  const displayCandidatePostMaps = () => {
    var { handleOnCandidatePost, history } = props;
    let candidatePostMap_s = []
    axios
      .get("https://pure-wave-01085.herokuapp.com/api/candidate_post_map")
      .then(response => {
        console.log("data", response.data);

        let candidatePostMap_s = response.data.candidate_post_map.map(p => p);
        props.handleOnCandidatePost("candidatePost", candidatePostMap_s);
      });
    return (handleAuthenticaton(history), handleOnCandidatePostClick(history));
  };


  const displayResponse = () => {
    var { history ,response} = props;

    axios
      .get("https://pure-wave-01085.herokuapp.com/api/response")
      .then(response => {
      let  question_s = response.data.result.map(q => q);
        console.log(response.data, "res")
        props.handleOnQuestions("response", question_s);
      });
    return (handleAuthenticaton(history), props.handleOnResponseClick(history));
  };

  const displayResult = () => {
    var { history } = props;
    let candidate_result = [];
    axios
      .get("https://pure-wave-01085.herokuapp.com/api/result")
      .then(response => {
        let candidate_result = response.data.result.map(q => q);
        props.handleOnQuestions("result_1", candidate_result);
      });



    return (handleAuthenticaton(history), props.handleOnResultClick(history));
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ background: "#009688", color: "white" }}
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Grid container className="dashboardContent">
          <Grid item md={11}>
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>

              <Grid item md={11}>
                <Typography
                  style={{ fontFamily: '"Apple Color Emoji"' }}
                  variant="h5"
                  color="inherit"
                  noWrap
                >
                  GoodWorks Colloquio
                </Typography>
              </Grid>

              <Grid item md={1}>
                <Typography variant="h6" color="inherit" noWrap>
                  <Button
                    style={{ color: " aliceblue" }}
                    onClick={() => {
                      onClickLogout();
                    }}
                  >
                    <i class="material-icons">power_settings_new</i>
                  </Button>
                </Typography>
              </Grid>
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
                <ChevronRightIcon />
              )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => displayPosts()} style={{ paddingRight: "100px" }}>
            <ListItemText inset primary="Post" />
          </ListItem>
          <ListItem button onClick={() => displayInstructions()}>
            <ListItemText inset primary="Instructions" />
          </ListItem>
          <ListItem button onClick={() => displayCandidatePostMaps(history)}>
            <ListItemText inset primary="Candidate Post Map" />
          </ListItem>
          <ListItem button onClick={() => displayQuestions()}>
            <ListItemText inset primary="Question" />
          </ListItem>
          <ListItem button onClick={() => displayResult(history)}>
            <ListItemText inset primary="Result" />
          </ListItem>
          <ListItem button onClick={() => displayResponse()}>
            <ListItemText inset primary="Response" />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <Typography>
          <Route exact path="/menu/post" component={Interview_Posts} />
          <Route exact path="/menu/question" component={Question_section} />
          <Route exact path="/menu/instruction" component={Instructions_Component} />
          <Route exact path="/menu/candidate_post_map" component={CandidatePostMap} />
          <Route exact path="/menu/result" component={Result} />
          <Route exact path="/menu/response" component={Response} />

        </Typography>
      </main>
    </div>
  );
};

const mapStateToProps = ({ open, actionList, history, posts, instructions ,response}) => {
  return {
    open,
    actionList,
    history,
    posts, instructions,response
  };
};
const mapDispatchToProps = dispatch => {
  return {
    handleAuthenticaton: history => dispatch(handleAuthenticaton(history)),
    // onClickLogout: histhistoryory => dispatch(onClickLogout(history)),
    handleOnPostClick: history => dispatch(handleOnPostClick(history)),
    handleOnQuestionClick: history => dispatch(handleOnQuestionClick(history)),
    handleDrawerOpen: () => dispatch(handleDrawerOpen()),
    handleDrawerClose: () => dispatch(handleDrawerClose()),
    handleOnInstructionClick: history => dispatch(handleOnInstructionClick(history)),
    handleOnCandidatePostClick: history => dispatch(handleOnCandidatePostClick(history)),
    handleOnPosts: (post, value) => {
      dispatch(handleOnPosts(post, value));
    },
    handleOnQuestions: (question, val) => {
      dispatch(handleOnQuestions(question, val));
    },
    handleOnCandidatePost: (candidatePost, postMapValue) => {
      dispatch(handleOnCandidatePost(candidatePost, postMapValue))
    },
    handleOnResultClick: history => dispatch(handleOnResultClick(history)),
    handleOnResponseClick: history => dispatch(handleOnResponseClick(history))

  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Menu));
