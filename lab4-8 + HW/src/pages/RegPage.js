import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";
import {Spinner} from "react-bootstrap";
import {useHistory} from "react-router";
import {createAction_setUserStatus} from "../store/actionCreators/AppActionsCreators";
import {useDispatch} from "react-redux";
import api_socket from "../network";


const theme = createTheme();

export default function SignUp() {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        const data = new FormData(event.currentTarget);
        const reg_data = {
            username: data.get('username'),
            login: data.get('login'),
            password: data.get('password'),
        }
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reg_data)
        };
        fetch(`http://${api_socket}/reg_new_user/`, requestOptions)
            .then(async response => {
                response = await response.json()
                console.log(response)
                if (response.success === 'NEW_USER_CREATED') {
                    // запрос на авторизацию
                    const try_login = await fetch(
                        `http://${api_socket}/login/`,
                        {
                            method: 'POST',
                            credentials: "include",
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8',
                            },
                            body: JSON.stringify({
                                login: data.get('login'),
                                password: data.get('password'),
                            })
                        }
                    )
                    console.log((await try_login.json()).error)
                    dispatch(createAction_setUserStatus(true))
                    setLoading(false)
                    history.push('/manga')
                }
                else if (response.error === 'LOGIN_IS_USED') {
                    // показать алерт о занятом логине
                    setLoading(false)
                }
                else {
                    // показать алерт об ошибке
                    setLoading(false)
                }
            })
            .catch(async reason => {
                console.log(await reason.json())
                setLoading(false)
            })
    };

    return (
        <div className={"registration"}>
            {loading? <div className={"hide-while-loading-page"}><Spinner animation={"border"}/></div>:
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Регистрация
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="username"
                                            label="Имя пользователя"
                                            name="username"
                                            autoComplete="username"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="login"
                                            label="Логин"
                                            name="login"
                                            autoComplete="login"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Пароль"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Продолжить
                                </Button>
                                <Grid container justifyContent="center">
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            Уже есть аккаунт? Войти
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            }
        </div>
    );
}