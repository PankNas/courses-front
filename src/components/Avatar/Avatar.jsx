import React, {useEffect, useRef, useState} from 'react';
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import {ClickAwayListener, Grow, MenuItem, MenuList, Popper} from "@mui/material";
import Paper from "@mui/material/Paper";
import {fetchAuthMe, logout} from "../../redux/slices/auth";
import {useDispatch, useSelector} from "react-redux";
import axios from "../../axios";

import styles from './Avatar.module.css';
import {useNavigate} from "react-router-dom";

const AvatarUser = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.auth);
  const inputFileRef = useRef(null);
  const [isChange, setIsChange] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(fetchAuthMe());
  }, [isChange]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (target) => {
    try {
      if (anchorRef.current && anchorRef.current.contains(target)) {
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

  const handleLogOut = (event) => {
    dispatch(logout());
    handleClose(event.target)
    localStorage.removeItem("token");
    navigate('/')
  };

  const handleDelUser = async (event) => {
    try {
      if (!window.confirm('Вы уверены, что хотите удалить аккаунт?')) return;

      await axios.delete(`/users/${data._id}`);

      dispatch(fetchAuthMe());
      localStorage.removeItem("token");

      handleClose(event.target)
      navigate('/')
      alert('Аккаунт удален');
    } catch (err) {
      console.log(err);
      alert('Не удалось удалить аккаунт');
    }
  };

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();

      formData.append("file", event.target.files[0]);

      const img = (await axios.post("/upload", formData)).data;
      await axios.patch(`/users/${data?._id}`, {avatarUrl: img.url.slice(4)})

      // setImageUrl(data.url.slice(4));

      handleClose(event.target)
      dispatch(fetchAuthMe())
      setIsChange(prev => !prev);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла!");
    }
  };

  return (
    <>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        variant={'text'}
      >
        {
          !data?.avatarUrl ?
            <Avatar style={{backgroundColor: '#FF9F67', padding: '0'}} /> :
            <Avatar style={{padding: '0'}} src={`http://localhost:8000${data?.avatarUrl}`}/>
        }
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
                  <MenuItem onClick={() => inputFileRef.current.click()}>
                    <button
                      style={{width: '100%', margin: '0'}}
                      // variant={'text'}
                      // onClick={() => inputFileRef.current.click()}
                      className={styles.button}
                    >
                      Изменить аватарку
                    </button>
                    <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
                  </MenuItem>

                  <MenuItem onClick={handleLogOut}>
                    <button
                      // variant={'text'}
                      // onClick={handleLogOut}
                      className={styles.button}
                    >
                      Выход
                    </button>
                  </MenuItem>

                  {
                    data?.role !== 'adm' &&
                    <MenuItem onClick={handleDelUser}>
                      <button
                        // variant={'text'}
                        // onClick={handleDelUser}
                        className={styles.button}
                      >
                        Удалить аккаунт
                      </button>
                    </MenuItem>
                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default AvatarUser;
