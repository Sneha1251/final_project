import { Routes, Route } from "react-router-dom";
import Login from "./login";
import SignUp from "./signUp";
import AuthProtected from "./authProtected";
import Logout from "./logout";
import NotFoundPage from "./notFoundPage";
import Home from "./home";

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route exact path="/logout" element={<AuthProtected Item={Logout} />} />
      <Route exact path="/home" element={<AuthProtected Item={Home}/>}/>
    </Routes>
  );
};
export default Routing;
