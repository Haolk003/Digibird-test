import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

import CreateEditItem from "../components/CreateEditItem";
function EditAddress() {
  return (
    <div>
      <Link to="/address" className="absolute top-2 left-2 text-[#333] ">
        <IoIosArrowBack size={30} />
      </Link>
      <div className="w-[80%] mx-auto mt-3">
        <CreateEditItem isEdit={true} />
      </div>
    </div>
  );
}

export default EditAddress;
