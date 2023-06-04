import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Persuratan from "./Pages/Persuratan";
import Riwayat from "./Pages/Riwayat";
import Preview from "./Pages/Preview";
import Print from "./Pages/Print";
import Edit from "./Pages/Edit";
import PrintMailing from "./Pages/PrintMailing";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/persuratan" element={<Persuratan />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/riwayat" element={<Riwayat />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/print" element={<Print />} />
        <Route path="/print-mailing" element={<PrintMailing />} />
      </Routes>
    </div>
  );
}

export default App;
