import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

import CreateEditItem from "../components/CreateEditItem";
function AddAddress() {
  return (
    <div className="relative">
      <Link to="/address" className="absolute top-0 left-2 text-[#333] ">
        <IoIosArrowBack size={30} />
      </Link>
      <div className="w-[80%] mx-auto mt-5">
        <CreateEditItem />
      </div>
    </div>
  );
}

export default AddAddress;
