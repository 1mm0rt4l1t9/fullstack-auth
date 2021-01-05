import React, { useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import { Container, Card, Typography, TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from "notistack";

import { useStyles } from './styles';
import { actions as authActions } from '../../store/ducks/auth.duck';

const Login = ({ login, clearLogin }) => {
  const classes = useStyles();

  const { loginLoading, loginSuccess, loginError } = useSelector(({ auth }) => ({
    loginLoading: auth.loginLoading,
    loginSuccess: auth.loginSuccess,
    loginError: auth.loginError,
  }));

  const { values, handleChange, handleSubmit, resetForm, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => {
      login({ email: values.email, password: values.password });
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Введите корректный Email')
        .required('Поле обязательно для заполнения')
        .trim(),
      password: Yup.string().required('Поле обязательно для заполнения').trim(),
    }),
  });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (loginSuccess || loginError) {
      enqueueSnackbar(loginSuccess ? 'Пользователь успешно создан' : `${loginError}`, {
        variant: loginSuccess ? 'success' : 'error',
      });
    }
    clearLogin();
    resetForm();
  }, [resetForm, loginSuccess, loginError, clearLogin, enqueueSnackbar]);

  return (
    <Container className={classes.root}>
      <Card className={classes.authBlock}>
        <Typography className={classes.title}>Вход</Typography>

        <div className={classes.inputContain}>
          <TextField
            type="text"
            label="Email"
            value={values.email}
            onChange={handleChange}
            name="email"
            variant="outlined"
            required={true}
            fullWidth={true}
            helperText={touched.email && errors.email}
            error={Boolean(touched.email && errors.email)}
          />
        </div>

        <div className={classes.inputContain}>
          <TextField
            type="password"
            label="Пароль"
            value={values.password}
            onChange={handleChange}
            name="password"
            variant="outlined"
            required={true}
            fullWidth={true}
            helperText={touched.password && errors.password}
            error={Boolean(touched.password && errors.password)}
          />
        </div>

        <div className={classes.buttonContain}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loginLoading}>
            Войти
          </Button>
        </div>

        <div className={classes.buttonContain}>
          <Link className={classes.link} to="/registr">
            <Button>Регистрация</Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
};

const connector = connect(null, {
  login: authActions.loginRequest,
  clearLogin: authActions.clearLogin,
});

export default connector(Login);
