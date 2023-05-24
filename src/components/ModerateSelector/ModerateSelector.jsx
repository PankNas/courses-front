import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, logout} from "../../redux/slices/auth";
import axios from "../../axios";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import {ClickAwayListener, Grow, MenuItem, MenuList, Popper} from "@mui/material";
import Paper from "@mui/material/Paper";
import {Link} from "react-router-dom";

const ModerateSelector = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    try {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    } catch (err) {
      setOpen(false)
    }
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        variant={'text'}
      >
        Модерация
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={handleClose}>
                    <Link to={'/check'}>
                      <MenuItem onClick={handleClose}>
                        Мои проверки
                      </MenuItem>
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={handleClose}>
                    <Link to={'/moderate'}>
                      <MenuItem onClick={handleClose}>
                        Ожидают проверки
                      </MenuItem>
                    </Link>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default ModerateSelector;
