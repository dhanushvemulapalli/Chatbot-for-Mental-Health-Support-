// Shanmuka
import { Box } from "@chakra-ui/react";
import Sidebar from "../Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const AnonymousLayout = ({ children, checkLoginStatus }) => {
  return (
    <>
      <Box style={{ display: "flex" }}>
        <Sidebar checkLoginStatus={checkLoginStatus} />
        <main style={{ flex: 1, padding: "1rem" }}>{children}</main>
      </Box>
    </>
  );
};

export default AnonymousLayout;
