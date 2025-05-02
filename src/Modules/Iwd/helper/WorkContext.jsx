import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const WorkContext = createContext();

export function WorkProvider({ children }) {
  const [workDetails, setWorkDetails] = useState({});
  return (
    <WorkContext.Provider value={(workDetails, setWorkDetails)}>
      {children}
    </WorkContext.Provider>
  );
}
WorkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
