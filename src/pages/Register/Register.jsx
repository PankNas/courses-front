import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import {Link, Navigate, useNavigate} from "react-router-dom";

const Register = () => {
  // const isAuth = useSelector(selectIsAuth);
  const user = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "Vasya Pypkin",
      email: "vasya@test.ru",
      password: "12345",
      codeAccess: '',
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    let fields = {
      ...values
    }

    const data = await dispatch(fetchRegister(fields));

    if (!data.payload) {
      return alert("Не удалось зарегистрироваться!");
    }

    if ("token" in data.payload) {
      localStorage.setItem("token", data.payload.token);
    }

    const path = data.payload.data.role === 'member' ? 'study' : 'check';

    navigate(`/${path}`)
  };

  // if (isAuth) {
  //   return <Navigate to="/study" />;
  // }
  // if (user.status === 'loaded') {
  //   if (user.data?.role === 'member') return <Navigate to="/study" />;
  //   if (user.data?.role === 'moderator') return <Navigate to="/check" />;
  // }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
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
        {/*<TextField*/}
        {/*  error={Boolean(errors.codeAccess?.message)}*/}
        {/*  helperText={errors.codeAccess?.message}*/}
        {/*  type="text"*/}
        {/*  {...register("codeAccess")}*/}
        {/*  className={styles.field}*/}
        {/*  label="Код сотрудника"*/}
        {/*  fullWidth*/}
        {/*/>*/}
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          style={{backgroundColor: "rgb(98, 116, 255)"}}
          fullWidth
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};

export default Register;
