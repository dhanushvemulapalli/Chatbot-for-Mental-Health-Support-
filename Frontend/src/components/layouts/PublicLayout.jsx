// layouts/PublicLayout.jsx

import Navbar from "../Navbar";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default PublicLayout;
