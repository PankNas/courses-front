import React, {useEffect, useRef} from 'react';
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import {pathFolder} from "../../App";
import {ClickAwayListener, Grow, MenuItem, MenuList, Popper} from "@mui/material";
import Paper from "@mui/material/Paper";
import {fetchAuthMe, logout} from "../../redux/slices/auth";
import {useDispatch, useSelector} from "react-redux";
import axios from "../../axios";

const AvatarUser = ({symbol}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.auth);
  const inputFileRef = useRef(null);

  // useEffect(() => {
  //   dispatch(fetchAuthMe());
  // }, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (target) => {
    if (anchorRef.current && anchorRef.current.contains(target)) {
      return;
    }

    setOpen(false);
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
  };

  const handleDelUser = async (event) => {
    try {
      if (!window.confirm('Вы уверены, что хотите удалить аккаунт?')) return;

      await axios.delete(`/users/${data._id}`);

      dispatch(fetchAuthMe());
      localStorage.removeItem("token");

      handleClose(event.target)
      alert('Аккаунт удален');
    } catch (err) {
      console.log(err);
      alert('Не удалось удалить аккаунт');
    }
  };

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      console.log('hi');

      formData.append("file", event.target.files[0]);

      const img = (await axios.post("/upload", formData)).data;
      await axios.patch(`/users/${data?._id}`, {avatarUrl: img.url.slice(4)})

      // setImageUrl(data.url.slice(4));

      handleClose(event.target)
      // if (anchorRef.current && anchorRef.current.contains(event.target)) {
      //   return;
      // }
      //
      // setOpen(false);
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
            <Avatar style={{backgroundColor: '#FF9F67'}}>{symbol.toUpperCase()}</Avatar> :
            <Avatar src={`http://localhost:8000${data?.avatarUrl}`}/>
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
                  <MenuItem >
                    <Button
                      // style={{width: '100%'}}
                      variant={'text'}
                      onClick={() => inputFileRef.current.click()}
                    >
                      Изменить изображение профиля
                    </Button>
                    <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
                  </MenuItem>

                  <MenuItem >
                    <Button
                      variant={'text'}
                      onClick={handleLogOut}
                    >
                      Выход
                    </Button>
                  </MenuItem>

                  <MenuItem >
                    <Button
                      variant={'text'}
                      onClick={handleDelUser}
                    >
                      Удалить аккаунт
                    </Button>
                  </MenuItem>
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
