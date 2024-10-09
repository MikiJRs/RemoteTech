import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';  // Login bileşenini içe aktarıyoruz
import AdminPage from './components/AdminPage';  // AdminPage bileşenini içe aktarıyoruz

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login sayfası için route */}
        <Route path="/login" element={<Login />} />

        {/* AdminPage bileşeni için route */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Root path (/) kullanıldığında otomatik olarak /login sayfasına yönlendirme */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
