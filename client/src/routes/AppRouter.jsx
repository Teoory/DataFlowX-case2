import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useUser } from '../hooks/UserContext';

import Login from '../pages/Login';
import Home from '../pages/Home';
import Table1 from '../pages/Table1';
import Table2 from '../pages/Table2';

const AppRouter = () => {
  const location = useLocation();
  const { user } = useUser();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      {user ?(
      <>
        <Route path="*" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/table1" element={<Table1 />} />
        <Route path="/table2" element={<Table2 />} />
      </>
      ):(
        <>
          <Route path="*" element={<Login />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;