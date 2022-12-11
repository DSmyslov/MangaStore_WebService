import React, {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {useDispatch, useSelector} from "react-redux";
import {
    createAction_addToAppBarLinks, createAction_deleteFromAppBarLinks,
    createAction_setUserStatus
} from "../store/actionCreators/AppActionsCreators"
import {useHistory} from "react-router";


function ResponsiveAppBar() {

    const [anchorElNav, setAnchorElNav] = useState(null);
    const default_pages = useSelector(state => state.ui.App.AppBarLinks)
    const userStatus = useSelector(state => state.cached_data.App.userAuthorized)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLoginLogoutBtnClick = event => {
        event.preventDefault()
        if (userStatus) {
            fetch('http://localhost:8000/logout/',
                {
                    credentials: "include"
                })
                .then(response => {
                    dispatch(createAction_setUserStatus(false))
                    history.push('/login')
                })
        }
        else history.push('/login')
    }

    useEffect(() => {

        if (userStatus) dispatch(createAction_addToAppBarLinks([
            { title: 'Корзина', link: '/cart' },
            { title: 'Заказы', link: '/purchases' },
        ]))
        else {
            dispatch(createAction_deleteFromAppBarLinks('Корзина'))
            dispatch(createAction_deleteFromAppBarLinks('Заказы'))
        }

    }, [userStatus])

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Manga WebStore
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {default_pages.map((page, index) => (
                                <MenuItem key={index} onClick={event => {
                                    event.preventDefault()
                                    history.push(page.link)
                                    handleCloseNavMenu()
                                }}>
                                    <Typography textAlign="center">{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Manga WebStore
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {default_pages.map((page, index) => (
                            <Button
                                key={index}
                                onClick={event => {
                                    event.preventDefault()
                                    if (index !== 2) history.replace(page.link)
                                    else history.push(page.link, )
                                }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>
                    <Button color="inherit" onClick={handleLoginLogoutBtnClick}>
                        {userStatus ? 'Выйти': 'Войти'}
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
