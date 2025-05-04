import AppBar from "./components/app-bar";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default Layout;
