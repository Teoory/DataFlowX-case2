import { Typography } from '@mui/material';
import { useUser } from '../hooks/UserContext';


const Home = () => {
  const { user } = useUser();

  return (
    <div className="container">
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography variant="h4" gutterBottom>
          Hoş Geldiniz, {user?.name}!
        </Typography>
        <Typography variant="body1">
          Header'dan tablo sayfalarına erişebilirsiniz.
        </Typography>
      </div>
    </div>
  );
};

export default Home;
