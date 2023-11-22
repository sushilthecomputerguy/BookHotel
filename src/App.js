import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
import HomeComponent from './components/home/home';

import LoginComponent from './components/login/login';
import PostsComponent from './components/admin/posts/add';
import PostEdit from './components/admin/posts/edit';
import NoteListComponent from './components/admin/posts/list';
import { ToastContainer, toast } from 'react-toastify';


// import NoteComponent from './components/admin/category/add';
// import PostEdit from './components/admin/category/edit';
import CategoryListComponent from './components/admin/category/list';
import CategoryEditComponent from './components/admin/category/edit';

function App() {
  return (
    <>
      <Router >
        <Routes>
          <Route path="/" element={<HomeComponent />} />

          <Route path="/login" element={<LoginComponent />} />
          <Route path='/admin/posts/add' element={<ProtectedRoute><PostsComponent /></ProtectedRoute>} />
          <Route exact path="/admin/posts/edit/:id" element={<ProtectedRoute><PostEdit /></ProtectedRoute>} />
          <Route exact path="/admin/posts/" element={<ProtectedRoute><NoteListComponent /></ProtectedRoute>} />

          <Route exact path="/admin/category/" element={<ProtectedRoute><CategoryListComponent /></ProtectedRoute>} />
          <Route exact path="/admin/category/:id" element={<ProtectedRoute><CategoryEditComponent /></ProtectedRoute>} />

        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
