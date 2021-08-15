import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

/**
 * This page is taken from the Material UI library and reorganized by Şükrü AYDINLIK.
 */

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



/**
 * 
 * Component
 */
export default function SignIn(props) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();
  const classes = useStyles();

  const login = () => {
    // history.push('/packages');

    const myHeaders = new Headers();
    myHeaders.append("X-Requested-With", "XMLHttpRequest");
    myHeaders.append("Cookie", "Ziyuno=6oqvdg7c73bodu2grppk30uin5");

    const formdata = new FormData();
    formdata.append("mail", email);
    formdata.append("password", password);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://api.ziyuno.com/api/auth/login/en", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.message.type === 'success') {
          history.push('/packages');
        } else {
          alert('Email or/and password is wrong. Please try again.');
        }
      })
      .catch(error => console.log('error', error));    // var data = new FormData();


  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event) => { setEmail(event.target.value); }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => { setPassword(event.target.value); }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={login}
          > Sign in
            {/* <Link to="/packages" className="btn btn-primary">Sign In</Link> */}
          </Button>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>

  );
}
