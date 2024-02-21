import React from "react"

// CAN WE DELETE ../util/fetchVersions???
// CAN WE DELETE ../util/fetchVersions???
// CAN WE DELETE ../util/fetchVersions???
// CAN WE DELETE ../util/fetchVersions???
// CAN WE DELETE ../util/fetchVersions???

// THE PLAN: WHEN THE SELECTED VERSION CHANGES THEN NAVIGATE TO NEW PAGE.
// THE PLAN: WHEN THE SELECTED VERSION CHANGES THEN NAVIGATE TO NEW PAGE.
// THE PLAN: WHEN THE SELECTED VERSION CHANGES THEN NAVIGATE TO NEW PAGE.
// THE PLAN: WHEN THE SELECTED VERSION CHANGES THEN NAVIGATE TO NEW PAGE.

const DefaultLayout = ({ children }) => {
  return (
    <div className="prose lg:prose-lg my-0 max-w-full">
      <div className="p-3 text-center bg-black">
        <h2 id="heading" className="text-white">Domino Split Documentation</h2>
      </div>
      <div className="pt-6 mx-auto max-w-3xl">
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
