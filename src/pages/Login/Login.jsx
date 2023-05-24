import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import styles from "./Login.module.css";

import {fetchAuth, fetchAuthMe, selectIsAuth} from "../../redux/slices/auth";
import {Link} from "react-router-dom";

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuth) {
  //     navigate('/area/catalog')
  //   }
  // }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "test@test.ru",
      password: "12345",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert("Не удалось авторизоваться!");
    }

    dispatch(fetchAuthMe())

    if ("token" in data.payload.data) {
      localStorage.setItem("token", data.payload.data.token);
    }

    // const path = data.payload.data.role === 'member' ? 'study' : 'check';
    //
    navigate(`/catalog`)
  };

  if (isAuth) {
    return <Navigate to="/catalog" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register("email", { required: "Укажите почту" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          type={'password'}
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите пароль" })}
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          style={{backgroundColor: "rgb(98, 116, 255)"}}
          fullWidth
        >
          Войти
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
