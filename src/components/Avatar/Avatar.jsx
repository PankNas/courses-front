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

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
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

  const handleLogOut = () => {
    dispatch(logout());
    localStorage.removeItem("token");
  };

  const handleDelUser = async () => {
    try {
      if (!window.confirm('Вы уверены, что хотите удалить аккаунт?')) return;

      await axios.delete(`/users/${data._id}`);

      dispatch(fetchAuthMe());
      localStorage.removeItem("token");

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

      const {data} = await axios.post("/upload", formData);

      // setImageUrl(data.url.slice(4));
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
            <Avatar src={`${pathFolder}${data?.avatarUrl}`}/>
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
                  <MenuItem onClick={handleClose}>
                    <p
                      style={{width: '100%'}}
                      onClick={() => inputFileRef.current.click()}
                    >
                      Изменить изображение профиля
                    </p>
                    <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
                  </MenuItem>

                  <Button
                    variant={'text'}
                    onClick={handleLogOut}
                  >
                    <MenuItem onClick={handleClose}>Выход</MenuItem>
                  </Button>
                  <Button
                    variant={'text'}
                    onClick={handleDelUser}
                  >
                    <MenuItem onClick={handleClose}>Удалить аккаунт</MenuItem>
                  </Button>
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
