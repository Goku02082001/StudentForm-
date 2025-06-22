
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import SexySidebarAuth from './page/Login';

function App() {
  return (
    
      <Router>
      <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="/login" element={<SexySidebarAuth />} />
      </Routes>
    </Router>
  );
}

export default App;
