import { Spin } from "antd";
import React, { FC, Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
const Login = React.lazy(() => import("../components/Auth/Login"));
const Board = React.lazy(() => import("../components/Board/Board"));
const Home = React.lazy(() => import("../components/Home/Home"));
const NotFound = React.lazy(() => import("../components/NotFound/NotFound"));
const ProjectTbl = React.lazy(() => import("../components/Project/ProjectTbl"));
const NewProject = React.lazy(() => import("../components/Form/NewProject"));
const PrivateRoute: FC = () => {
  // if (!userInfo) return <Navigate to="login" />;

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Navigate to="/project" />} />
        <Route path="project" element={<Outlet />}>
          <Route index element={<ProjectTbl />} />
          <Route path=":id" element={<Board />} />
        </Route>
        <Route path="/settings" element={<NewProject />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

const Routing: FC = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{ height: "100vh", display: "grid", placeContent: "center" }}
        >
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PrivateRoute />} />
      </Routes>
    </Suspense>
  );
};

export default Routing;

// type ProtectedRouteProps = {
//   element: JSX.Element;
//   path: string;
// };

// function ProtectedRoute({
//   path,
//   element,
// }: ProtectedRouteProps): React.ReactElement {
//   return (
//     <>
//       <Header />
//       <Routes>
//         <Route path={path} element={element} />
//       </Routes>
//     </>
//   );
// }
// const Routing: FC = () => {
//   return (
//     <Routes>
//        <Route path="login" element={<Login />} />
//       <Route
//         path="/"
//         element={<ProtectedRoute path="/" element={<Home />} />}
//       />
//       <Route
//         path="/about"
//         element={<ProtectedRoute path="/" element={<About />} />}
//       />

//     </Routes>
//   );
// };
