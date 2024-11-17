import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import UserDashboard from "./user_admin/Dashboard";
import DataPengguna from "./datapengguna/datapengguna";
import Register from "./register/Register";
import Login from "./login/login";
import HomePage from "./homepage/Homepage";
import HomepageUser from "./peserta/homepage/HomepageUser";
import Courses from "./peserta/courses/Courses";
import DeskripsiCourse from "./peserta/detailcourse/DeskripsiCourse";
import HomePagePengajar from "./pengajar/hompage/HomePagePengajar";
import TambahKelas from "./pengajar/tambahkelas/TambahKelas";
import TambahMateri from "./pengajar/tambahmateri/TambahMateri";


function App() {
  return (
    <Router>
      <div>
        <div id="idElemenTarget"></div>
        <Routes>
          {/* Tambahkan route untuk halaman root "/" */}
          <Route path="/" element={<Navigate to="/Dashboard" />} /> 

          {/* Route untuk dashboard user */}
          <Route path="/Dashboard" element={<UserDashboard />} />
          <Route path="/datapengguna" element={<DataPengguna />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/homepageuser" element={<HomepageUser />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/deskripsicourse" element={<DeskripsiCourse />} />
          <Route path="/homepengajar" element={<HomePagePengajar />} />
          <Route path="/tambahkelas" element={<TambahKelas />} />
          <Route path="/tambahmateri" element={<TambahMateri />} />
          

          {/* Fallback untuk rute yang tidak ditemukan */}
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
