import Navbar from "./Component/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Component/Footer/Footer";
import Home from "./pages/Home/Home";
import Protected from "./Component/Protected/Protected";
import Error from "./pages/Error/Error";
import Login from './pages/Login/login';
import { useSelector } from "react-redux";
import Signup from "./pages/Signup/Signup";
import Crypto from "./pages/Crypto/Crypto";
import Blog from "./pages/Blog/Blog";
import SubmitBlog from "./pages/SubmitBlog/SubmitBlog";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import UpdateBlog from "./pages/UpdtaeBlog/UpdateBlog";
import useAutoLogin from "./hooks/useAutoLogin";
import Loader from "./Component/Loader/Loader";

function App() {

  const isAuth = useSelector((state) => state.user.auth);

  const loading = useAutoLogin()


  return loading ? <Loader text='...'/> : (
    <div className='m-5'>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar/>
          <Routes>
            <Route
              path="/"
              exact
              element = {
              <div className="flex-1">
                <Home/>
              </div>
            }
            />
            <Route
              path="crypto"
              exact
              element={<div className="flex-1">
                <Crypto/>
              </div>}
            />
            <Route
              path="blogs"
              exact
              element={
              <Protected isAuth={isAuth}>
                <div className="flex-1">
                  <Blog/>
                </div>
              </Protected>}
            />
            <Route
              path="blog/:id"
              exact
              element={
              <Protected isAuth={isAuth}>
                <div className="flex-1">
                  <BlogDetails/>
                </div>
              </Protected>}
            />
            <Route
              path="blog/update/:id"
              exact
              element={
              <Protected isAuth={isAuth}>
                <div className="flex-1">
                  <UpdateBlog/>
                </div>
              </Protected>}
            />
            <Route
              path="submit"
              exact
              element={
              <Protected isAuth={isAuth}>
                <div className="flex-1">
                  <SubmitBlog />
                </div>
              </Protected>}
            />
            <Route
              path="login"
              exact
              element={<div className="flex-1">
                <Login />
              </div>}
            />
            <Route
              path="signup"
              exact
              element={<div className="flex-1">
                <Signup/>
              </div>}
            />

            <Route
              path="*"
              element={<div className="flex-1"><Error /></div>}
            />

          </Routes>
          <Footer/>

        </div>
      
      </BrowserRouter>
    </div>
  )
}

export default App;
