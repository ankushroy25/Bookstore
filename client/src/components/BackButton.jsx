import React from "react";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
const BackButton = ({ destination = "/" }) => {
  return (
    <div>
      <Link
        to={destination}
        className="bg-blue-800 text-white px-4 py-1 rounded-lg w-fit"
      >
        <IoArrowBackOutline className="inline-block mr-2" /> Back
      </Link>
    </div>
  );
};

export default BackButton;
