import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import {supabase} from "../supabase/index.js";
import {useEffect, useState} from "react";

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [user,setUser] = useState(false)
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (session !== null){
                setUser(true)
            }else {
                setUser(false)
            }
        })
    }, []);
    const handleLogout =async () => {
        await supabase.auth.signOut()
    }
    return (
        <AppBar position="static">
                <Toolbar disableGutters  className={"w-full px-5 flex justify-between items-center"}>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link to="/">
                            SUPA-BLOG
                        </Link>
                    </Typography>
                    <Box>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {
                                    user ?   <Avatar alt="Remy Sharp" src="https://img.icons8.com/?size=1x&id=20749&format=png" /> : <Avatar alt="Remy Sharp" src="https://img.icons8.com/?size=1x&id=98957&format=png" />

                                }
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {
                                user && <div>
                                    <MenuItem key={"create"} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">
                                            <Link to='/create'>
                                                Create
                                            </Link>
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem key={"profile"} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">
                                            <Link to='/profile'>
                                                Profile
                                            </Link>
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem key={"signout"} onClick={handleLogout}>
                                        <Typography textAlign="center">
                                                Sign Out
                                        </Typography>
                                    </MenuItem>
                                </div>
                            }
                            {
                                !user && <div>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">
                                            <Link to='/signup'>
                                                SignUP
                                            </Link>
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">
                                            <Link to='/login'>
                                                LogIN
                                            </Link>
                                        </Typography>
                                    </MenuItem>
                                </div>
                            }
                        </Menu>
                    </Box>
                </Toolbar>
        </AppBar>
    );
}
export default Navbar;