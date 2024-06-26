import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AuthProtected from "../helper/authProtected";
import NotFoundPage from "../helper/notFoundPage";

const Login = lazy(() => import("../pages/login"));
const SignUp = lazy(() => import("../pages/signUp"));
const Logout = lazy(() => import("../helper/logout"));
const Home = lazy(() => import("../pages/home"));
const EditPage = lazy(() => import("../pages/editPage"));
const ViewSingleData = lazy(() => import("../pages/viewSingleData"));
const UploadData = lazy(() => import("../pages/uploadData"));
const AddDataForm = lazy(() => import("../pages/createData"));

const Routing = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route exact path="/logout" element={<AuthProtected Item={Logout} />} />
        <Route exact path="/home" element={<AuthProtected Item={Home} />} />
        <Route exact path="/edit" element={<AuthProtected Item={EditPage} />} />
        <Route
          exact
          path="/view"
          element={<AuthProtected Item={ViewSingleData} />}
        />
        <Route
          exact
          path="/upload"
          element={<AuthProtected Item={UploadData} />}
        />
        <Route
          exact
          path="add-data"
          element={<AuthProtected Item={AddDataForm} />}
        />
      </Routes>
    </Suspense>
  );
};

export default Routing;
