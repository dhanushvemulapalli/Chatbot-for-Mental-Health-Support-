// layouts/PrivateLayout.jsx

import Sidebar from "../Dashboard/Sidebar";

const PrivateLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '1rem' }}>
        {children}
      </main>
    </div>
  );
};

export default PrivateLayout;
