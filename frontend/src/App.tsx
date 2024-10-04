import React from 'react';
import Login from './components/Login';  // Login bileşenini içe aktarıyoruz

const App: React.FC = () => {
  return (
    <div>
      <Login />  {/* Login bileşenini burada kullanıyoruz */}
    </div>
  );
};

export default App;
