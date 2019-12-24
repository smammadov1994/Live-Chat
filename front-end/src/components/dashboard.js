import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { CTX } from "./Store.js";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

export default function PaperSheet(props) {
  const classes = useStyles();

  ///CTX store
  const { allChats, sendChatAction, user } = React.useContext(CTX);
  console.log({ allChats });
  const topics = Object.keys(allChats);
  const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
  const [textValue, changeTextValue] = React.useState("");

  return (
    <div className="dashboard-screen">
      <div>
        <h1 className="active-title" variant="h5" component="h3">
          {activeTopic}
        </h1>
        <div className="topicsWindow">
          <List>
            {topics.map(topic => (
              <ListItem
                onClick={e => changeActiveTopic(e.target.innerText)}
                key={topic}
                button
              >
                <ListItemText primary={topic} />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      <div className="chat">
        <Typography component="p"></Typography>
        <div className="flex-profile">
          <div className="chatWindow">
            {allChats[activeTopic].map((chat, i) => (
              <div className="flex-profile" key={i}>
                <Chip label={chat.from} variant="outlined" className="chip" />
                <Typography
                  variant="body1"
                  gutterBottom
                  className="message-from"
                >
                  {chat.msg}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <div className="send-chat">
          <TextField
            variant="filled"
            className="chatfield"
            value={textValue}
            onChange={e => {
              changeTextValue(e.target.value);
            }}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              sendChatAction({
                from: user,
                msg: textValue,
                topic: activeTopic
              });
              changeTextValue("");
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
