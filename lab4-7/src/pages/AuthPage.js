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
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {createAction_setUserStatus} from "../store/actionCreators/AppActionsCreators";
import {useHistory} from "react-router";

const theme = createTheme();

export default function SignIn() {

    const history = useHistory()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const submitHandler = e => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData(e.currentTarget);
        const data_to_send = {
            login: data.get('login'),
            password: data.get('password'),
        }
        fetch(
            'http://localhost:8000/login/',
            {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(data_to_send)
            }
        )
            .then(async response => {
                if (response.status === 403) {
                    console.log('U ARE ALREADY AUTHORIZED')
                    setLoading(false)
                    history.push('/login')
                }
                else if ((await response.json()).error) {
                    console.log('Неверный логин или пароль!')
                    setLoading(false)
                    history.push('/login')
                }
                else {
                    dispatch(createAction_setUserStatus(true))
                    setLoading(false)
                    history.push('/manga')
                }
            })
            .catch(reason => {
                console.log(reason)
                setLoading(false)
            })
    }

    return (
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
                        Авторизация
                    </Typography>
                    <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="login"
                            label="Логин"
                            name="login"
                            autoComplete="login"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Войти
                        </Button>
                        <Grid container justifyContent={"center"}>
                            <Grid item>
                                <Link href="/reg" variant="body2">
                                    "Еще нет аккаунта? Зарегистрироваться"
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}