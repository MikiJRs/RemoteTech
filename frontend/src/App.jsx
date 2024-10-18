import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminPage from './components/AdminPage';
import AddPackage from './components/AddPackage';
import InterviewList from './components/interviewlist';
import VideoCollection from './components/VideoCollection';
import QuestionList from   './components/QuestionList.jsx';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login sayfası için route */}
        <Route path="/login" element={<Login />} />

        {/* AdminPage bileşeni için route */}
        <Route path="/manage-question-package" element={<AdminPage />} />

        {/* Paket Ekleme Sayfası */}
        <Route path="/manage-question-package/add-package" element={<AddPackage />} />

        {/* InterviewList bileşeni için route */}
        <Route path="/interviewlist" element={<InterviewList />} />

        <Route path="/videocollection/:interviewType" element={<VideoCollection />} />
        
        <Route path="/questionlist" element={<QuestionList/>}/>

        {/* Root path (/) kullanıldığında otomatik olarak /login sayfasına yönlendirme */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
