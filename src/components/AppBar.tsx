import React, { FunctionComponent, useState } from 'react';
import { AppBar as MuiAppBar, Box, Button, createStyles, fade, InputBase, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';

interface IAppBarProps {
  onLogin: (username: string, password: string) => Promise<void>;
  onRegister: (username: string, password: string) => Promise<void>;
  onLogout: () => void;
  onCreate: () => void;
  isAuth: boolean;
  username?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
      display: 'none',
    },
    base: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      width: '150px',
      marginLeft: theme.spacing(1)
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
    },
  }),
);

const AppBar: FunctionComponent<IAppBarProps> = (props) => {
  const classes = useStyles();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  if (props.isAuth) {
    return (
      <MuiAppBar position="static">
        <Box display="flex" justifyContent="space-between">
          <Toolbar>
            <Button 
              color="inherit"
              onClick={props.onCreate}
            >
              Show create form
            </Button>
          </Toolbar>
          <Toolbar>
            <Typography variant="body1">
              Login as {props.username} &nbsp;|
            </Typography>
            <Button 
              color="inherit"
              onClick={props.onLogout}
            >
              Logout
            </Button>
          </Toolbar>
        </Box>
      </MuiAppBar>
    );
  }
  
  return (
    <MuiAppBar position="static">
      <Box display="flex" justifyContent="flex-end">
        <Toolbar>
          <div className={classes.base}>
            <InputBase
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <div className={classes.base}>
            <InputBase
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <Button 
            color="inherit" 
            onClick={() => props.onLogin(username, password)}
          >
            Login
          </Button>
          |
          &nbsp;
          <Button 
            color="inherit" 
            onClick={() => props.onRegister(username, password)}
          >
            Register
          </Button>
        </Toolbar>
      </Box>
    </MuiAppBar>
  );
};

export default AppBar;
