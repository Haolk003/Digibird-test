import React from "react";
import CreateEditItem from "../components/CreateEditItem";
function EditAddress() {
  return (
    <div className="w-[80%] mx-auto mt-3">
      <CreateEditItem isEdit={true} />
    </div>
  );
}

export default EditAddress;
