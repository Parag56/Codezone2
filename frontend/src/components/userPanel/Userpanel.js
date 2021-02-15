import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Avatar from '@material-ui/core/Avatar'
import "./Userpanel.css";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Userpanel(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleformsubmit=(e)=>{
      e.preventDefault()
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [selectedsection, setselectedsection] = useState("myprofile");
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem
          button
          key={"1"}
          onClick={() => {
            setselectedsection("updateprofile");
          }}
          selected={selectedsection === "updateprofile"}
        >
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={"Update Profile"} />
        </ListItem>
        <ListItem
          button
          key={"2"}
          onClick={() => {
            setselectedsection("myprofile");
          }}
          selected={selectedsection === "myprofile"}
        >
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={"My Profile"} />
        </ListItem>
        <ListItem
          button
          key={"1"}
          onClick={() => {
            setselectedsection("codes");
          }}
          selected={selectedsection === "codes"}
        >
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={"Codes"} />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Welcome, Parag
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
        {selectedsection === "myprofile" && <div>
              <div className="myprofilemain">
                  <div className="imagesection">
                  <Avatar  src="#" />
                  </div>
               <div className="infosection">
                   <div className="namesection">
                       <h3>Parag Thakur</h3>
                   </div>
                   <div className="languages">
                       <h4>Languages:- C++,C,Python</h4>
                   </div>

               </div>
              </div>
              </div>}
          {selectedsection === "updateprofile" && (
            <div>
              <div className="updateprofilehead">
                <h1>Update Profile</h1>
              </div>
              <div className="updateprofileform">
                <Form onSubmit={handleformsubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          )}
          {selectedsection === "codes" && <div className="savecarea">
              <div className="savechead">
                 <h1>Codes</h1>
              </div>
               <div className="codes__list">
                   <div className="firstcode">
                       <h2>Code Name</h2>
                       <h2>Language:-C++</h2>
                       <h2>4min ago</h2>
                   </div>


                   <div className="firstcode">
                       <h2>Code Name</h2>
                       <h2>Language:-C++</h2>
                       <h2>4min ago</h2>
                   </div>

                   <div className="firstcode">
                       <h2>Code Name</h2>
                       <h2>Language:-C++</h2>
                       <h2>4min ago</h2>
                   </div>

                   <div className="firstcode">
                       <h2>Code Name</h2>
                       <h2>Language:-C++</h2>
                       <h2>4min ago</h2>
                   </div>
               </div>
              </div>}
        </Typography>
      </main>
    </div>
  );
}
export default Userpanel;
