// src/components/NavBar.js

import React from 'react';

const NavBar = ({ setSensorType }) => {
  return (
    <nav>
      <button onClick={() => setSensorType('internet')}>Internet</button>
      <button onClick={() => setSensorType('motion')}>Motion</button>
      <button onClick={() => setSensorType('latency')}>Latency</button>
    </nav>
  );
};

export default NavBar;
