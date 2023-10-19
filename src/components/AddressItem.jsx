import React from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";

const AddressItem = ({ name, address, phoneNumber, email, id }) => {
  return (
    <div>
      <div className="relative">
        <button className="absolute top-0 right-0 text-red-500">Xoá</button>
        <h3 className="font-[500] text-[#333] mb-2">Họ và tên : {name}</h3>

        <div className="flex items-center gap-2 mb-1 text-gray-400 text-[14px]">
          <FiMapPin />
          <span>Địa chỉ</span>
        </div>
        <div className="mb-3 text-[15px] text-[#333] text-[500]">{address}</div>
        <div className="flex items-center gap-2 mb-1 text-gray-400 text-[14px]">
          <FiPhone />
          <span>Số điện thoại</span>
        </div>
        <div className="mb-3 text-[15px] text-[#333] text-[500]">
          {phoneNumber}
        </div>
        <div className="flex items-center gap-2 mb-1 text-[14px] text-gray-400">
          <TfiEmail />
          <span>Địa chỉ email</span>
        </div>
        <div className="mb-4 text-[15px] text-[#333] text-[500]">{email}</div>
        <Link to={`/address/${id}`}>Chỉnh sửa</Link>
      </div>
    </div>
  );
};

export default AddressItem;
