import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks/UserContext';

const Header = () => {
  const { user, logout } = useUser();

  if (!user) return null;

  return (
    <AppBar position="fixed" className="header-nav">
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            color: '#1976d2',
            fontWeight: 600 
          }}
        >
          DataFlowX <span style={{color:'#ff5500'}}>Case 2</span>
        </Typography>
        <Link className="nav-link" to={'/table1'}>Tablo 1</Link>
        <Link className="nav-link" to={'/table2'}>Tablo 2</Link>
        <Link 
          className="nav-link logout-button" 
          onClick={() => {
            logout();
          }}
          to={'/login'}
        >
          Çıkış Yap
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
