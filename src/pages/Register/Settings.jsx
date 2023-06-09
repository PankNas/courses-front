import React, {useEffect, useRef, useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import {fetchAuthMe, fetchRegister, selectIsAuth} from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from "../../axios";
import {pathFolder} from "../../App";
import {IconButton} from "@mui/material";

const Settings = () => {
  const isAuth = useSelector(selectIsAuth);
  const {data} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputFileRef = useRef(null);

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    setImageUrl(data?.avatarUrl)
  }, [])

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: data?.fullName,
      email: data?.email,
      password: data?.password,
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      let fields = {
        ...values,
        avatarUrl: imageUrl,
      }

      await axios.patch('/auth/me', fields);

      dispatch(fetchAuthMe())

      navigate(-1)
    } catch (err) {
      console.log(err);
      alert('Не удалось обновить данные пользователя!')
    }
  };

  // if (isAuth) {
  //   return <Navigate to="/" />;
  // }

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();

      formData.append("file", event.target.files[0]);

      const img = (await axios.post("/upload", formData)).data;

      setImageUrl(img.url.slice(4));
      console.log(imageUrl);
      // dispatch(fetchAuthMe())
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла!");
    }
  };

  const handleDelImg = () => setImageUrl('');

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Настройка аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar
          onClick={() => inputFileRef.current.click()}
          sx={{ width: 100, height: 100 }}
          src={`http://localhost:8000${imageUrl}`}
        />
        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
        {
          imageUrl &&
          <IconButton
            onClick={handleDelImg}
          >
            <img
              className={styles.img}
              alt={'delete'}
              src={`http://localhost:8000/uploads/my/close.svg`}
            />
          </IconButton>
        }
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Укажите полное имя" })}
          className={styles.field}
          label="Полное имя"
          fullWidth
          required
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register("email", { required: "Укажите почту" })}
          className={styles.field}
          label="E-Mail"
          fullWidth
          required
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register("password", { required: "Укажите пароль" })}
          className={styles.field}
          label="Пароль"
          fullWidth
          required
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          style={{backgroundColor: "rgb(98, 116, 255)"}}
          fullWidth
        >
          Сохранить
        </Button>
      </form>
    </Paper>
  );
};

export default Settings;
