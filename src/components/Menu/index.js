import React from "react";
import "./index.css";
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
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Grid, Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

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
  const {
    open,
    handleDrawerOpen=()=>{},
    handleDrawerClose=()=>{},
    handleUserOnClick=()=>{},
    handleActionsOnClick=()=>{},
    handleRolesOnClick=()=>{},
    handleRoleActionOnClick=()=>{},
    onClickLogout=()=>{},
    history
  } = props;
  const classes = useStyles();
  const theme = useTheme();
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
                      onClickLogout(history);
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
          <ListItem button onClick={() => handleRolesOnClick(history)}>
            <ListItemText inset primary="Roles" />
          </ListItem>
          <ListItem button onClick={() => handleActionsOnClick(history)}>
            <ListItemText inset primary="Actions" />
          </ListItem>
          <ListItem button onClick={() => handleRoleActionOnClick(history)}>
            <ListItemText inset primary="Role Action" />
          </ListItem>
          <ListItem button onClick={() => handleUserOnClick(history)}>
            <ListItemText inset primary="Create User" />
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

          
        </Typography>
      </main>
    </div>
  );
};

const mapStateToProps = ({ open }) => {
  return {
    open
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onClickLogout: history => dispatch(onClickLogout(history)),
    handleDrawerOpen: () => dispatch(handleDrawerOpen()),
    handleDrawerClose: () => dispatch(handleDrawerClose()),
    handleUserOnClick: history => {
      dispatch(handleUserOnClick(history));
    },
    handleActionsOnClick: history => {
      dispatch(handleActionsOnClick(history));
    },
    handleRoleActionOnClick: history => {
      dispatch(handleRoleActionOnClick(history));
    },
    handleRolesOnClick: history => {
      dispatch(handleRolesOnClick(history));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Menu));
