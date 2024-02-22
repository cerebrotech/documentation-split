import React, { useState, useEffect } from "react";
import { navigate } from "gatsby"
import { useLocation } from "../util/location";

// CAN WE DELETE ../util/fetchVersions???
// CAN WE DELETE ../util/fetchVersions???
// CAN WE DELETE ../util/fetchVersions???
// CAN WE DELETE ../util/fetchVersions???
// CAN WE DELETE ../util/fetchVersions???

const DefaultLayout = ({ children }) => {
  const location = useLocation();

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    navigate(`/test/`)
  };

  const isLandingPage = () => {
    return location.pathname === "/";
  }

  return (
    <div className="prose lg:prose-lg my-0 max-w-full">
      <div className="p-3 text-center bg-black">
        <a href="/"><h2 id="heading" className="text-white">XXX</h2></a>
      </div>
      <div className="flex">
        <div id="nav-left" className="flex-1" style={{ flex: '0 0 20%' }}>
          {!isLandingPage() && (
          <div>
            <label htmlFor="version-selector">Select Version:</label>
            <select id="version-selector" onChange={handleChange}>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
          )}
        </div>
        <div className="flex-1" style={{ flex: '0 0 80%' }}>
          <div className="pt-6 pl-4 pr-2 max-w-3xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
