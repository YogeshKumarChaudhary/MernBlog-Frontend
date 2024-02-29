import Navbar from "./components/navbar/Navbar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import CreateBlogPage from "./pages/CreateBlogPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import EditBlogPage from "./pages/EditBlogPage";

const App = () => {
  return (
    <main className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<CreateBlogPage />} />
        <Route path="/post/:id" element={<PostDetailsPage />} />
        <Route path="/edit/:id" element={<EditBlogPage />} />
      </Routes>
    </main>
  );
};

export default App;
