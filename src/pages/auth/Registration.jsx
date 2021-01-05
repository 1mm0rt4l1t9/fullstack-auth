import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, connect } from 'react-redux';
import { Container, Card, Typography, TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

import { useStyles } from './styles';
import { actions as authActions } from '../../store/ducks/auth.duck';

const Registration = ({ register, clearReg }) => {
  const classes = useStyles();

  const { regLoading, regSuccess, regError } = useSelector(({ auth }) => ({
    regLoading: auth.regLoading,
    regSuccess: auth.regSuccess,
    regError: auth.regError,
  }));

  const { values, handleChange, handleSubmit, resetForm, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    onSubmit: (values) => {
      register({ email: values.email, password: values.password });
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Введите корректный Email')
        .required('Поле обязательно для заполнения')
        .trim(),
      password: Yup.string().required('Поле обязательно для заполнения').trim(),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Повторите пароль')
        .trim(),
    }),
  });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (regSuccess || regError) {
      enqueueSnackbar(regSuccess ? 'Пользователь успешно создан' : `${regError}`, {
        variant: regSuccess ? 'success' : 'error',
      });
    }
    clearReg();
    resetForm();
  }, [regSuccess, regError, clearReg, resetForm, enqueueSnackbar]);

  return (
    <Container className={classes.root}>
      <Card className={classes.authBlock}>
        <Typography className={classes.title}>Регистрация</Typography>

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

        <div className={classes.inputContain}>
          <TextField
            type="password"
            label="Повторите пароль"
            value={values.repeatPassword}
            onChange={handleChange}
            name="repeatPassword"
            variant="outlined"
            required={true}
            fullWidth={true}
            helperText={touched.repeatPassword && errors.repeatPassword}
            error={Boolean(touched.repeatPassword && errors.repeatPassword)}
          />
        </div>

        <div className={classes.buttonContain}>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={regLoading}>
            Зарегистрироваться
          </Button>
        </div>

        <div className={classes.buttonContain}>
          <Link className={classes.link} to="/login">
            <Button>Назад</Button>
          </Link>
        </div>
      </Card>
    </Container>
  );
};

const connector = connect(null, {
  clearReg: authActions.clearReg,
  register: authActions.regRequest,
});

export default connector(Registration);
