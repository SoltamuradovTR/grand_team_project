import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { loadAllAgents, selectAllAgents } from "../../redux/features/agent";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

function SideBar() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllAgents());
  }, [dispatch]);

  const agents = useSelector(selectAllAgents);
  console.log(agents);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Divider />
      <List style={{ width: 300, flexWrap: "wrap" }}>
        <Typography style={{ marginTop: 20, textAlign: "center" }} variant="h6">
          Наши агенты
        </Typography>
        {agents.map((agent, index) => (
          <NavLink
            style={{ textDecoration: "none", color: "inherit" }}
            to={`agent/${agent._id}`}
          >
            <ListItem button key={index}>
              <ListItemText>{index + 1}</ListItemText>
              <ListItemText>
                {agent.firstName} {agent.lastName}
              </ListItemText>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );
  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            style={{ marginRight: 20 }}
            variant="outlined"
            onClick={toggleDrawer(anchor, true)}
          >
            АГЕНТЫ
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default SideBar;
