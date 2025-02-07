import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/UserContext';
import { TextField, Button, Typography } from '@mui/material';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ 
      id: 1, 
      email: credentials.email, 
      name: 'Test User' 
    });
    navigate('/home');
  };

  return (
    <div className='login-container'>
      <div className='login-form'>
        <Typography variant="h5" gutterBottom>
          Giriş Yap
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Şifre"
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Giriş Yap
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
