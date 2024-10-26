import React from "react";
import PropTypes from "prop-types";
import { BsDatabase } from "react-icons/bs";
import { CgGitFork } from "react-icons/cg";

function Logo(props) {
  return (
    <h1 className="text-6xl font-bold flex items-end">
      DS.Alg
      <BsDatabase />
      Dec
      <CgGitFork className="p-0 m-0 text-7xl -ml-5" />
    </h1>
  );
}

Logo.propTypes = {};

export default Logo;
