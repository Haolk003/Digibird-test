import React, { useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import AddressItem from "../components/AddressItem";
import useGetAddress from "../hooks/useGetAddress";
import Loader from "../components/Loader/Loader";
import { Link } from "react-router-dom";
function Address() {
  const { isLoading, sendRequest, data } = useGetAddress();

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <>
      <div className='w-[80%] mx-auto after:absolute after:content-[""] after:top-0 after:left-[50%] after:-translate-x-1/2 after:w-[80%] after:h-[2px] after:bg-yellow-400 py-5 '>
        <ul className="flex flex-col gap-3">
          <li className="border-[2px] border-gray-300 rounded w-full h-[200px] p-4">
            <div className="border-[2px] border-dashed h-full border-gray-300 flex flex-col items-center justify-center gap-4">
              <div className="w-[80px] h-[80px] rounded-full border-[2px] border-dashed border-gray-400 flex items-center justify-center">
                <IoMdAdd size={50} className="text-gray-400" />
              </div>
              <Link
                to="/add-address"
                className="bg-gray-200 text-[#333] rounded-md px-4 py-1 font-[400]"
              >
                Thêm mới
              </Link>
            </div>
          </li>
          {data &&
            data.length > 0 &&
            data.map((item) => (
              <li
                className="border-[2px] border-gray-300 rounded w-full p-4"
                key={item.xid}
              >
                <AddressItem
                  id={item.xid}
                  district={item.state}
                  province={item.city}
                  address={item.address}
                  email={item.email}
                  name={item.name}
                  phoneNumber={item.phone}
                />
              </li>
            ))}
        </ul>
      </div>
      {isLoading && <Loader />}
    </>
  );
}

export default Address;
