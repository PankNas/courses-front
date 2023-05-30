import React from "react";

import axios from "../../axios";
import styles from './style.module.scss';

import {SideBlock} from "../SideBlock/SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {IconButton, ListItemButton} from "@mui/material";
import {useSelector} from "react-redux";

const CommentsBlock = ({ items, children, isLoading = true, fnUpdate}) => {
  const {data} = useSelector(state => state.auth);

  const handleDelComment = async (event) => {
    try {
      await axios.delete(`/comments/${event.target.id}`);

      fnUpdate()
    } catch (err) {}
  }

  return (
    <SideBlock title="Комментарии">
      <List>
        {items?.map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem >
              <ListItemAvatar>
                <Avatar alt={obj?.user?.fullName} src={`http://localhost:8000${obj?.user?.avatarUrl}`} />
              </ListItemAvatar>
              <ListItemText
                primary={`${obj?.user?.fullName}`}
                secondary={<>{obj?.dateTime}<br/>{obj?.text}</>}
              />
              {
                // delete comment
                (data?._id === obj?.user._id || data?.role === 'moderator') &&
                <IconButton
                  id={obj?._id}
                  onClick={handleDelComment}
                >
                  <img
                    id={obj?._id}
                    className={styles.img}
                    alt={'delete'}
                    src={`http://localhost:8000/uploads/my/close.svg`}
                  />
                </IconButton>
              }
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};

export default CommentsBlock;
