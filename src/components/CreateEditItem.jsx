import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, MenuItem, Select } from "@mui/material";
import { BsPerson } from "react-icons/bs";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import toast from "react-hot-toast";

import { provinces } from "../data/provinces";
import { AddressSchema } from "../validations/addressChema";
import useAddShippingAddress from "../hooks/useaddShippingAddress";
import Loader from "./Loader/Loader";
import addressState from "../recoil/addressState";
import useGetAddress from "../hooks/useGetAddress";
import useEditShippingAddress from "../hooks/useEditShippingAddress";

const CreateEditItem = ({ isEdit }) => {
  const address = useRecoilValue(addressState);

  const { addressId } = useParams();

  const [provinceSelect, setProvinceSelect] = useState("");
  const [dictrictSelect, setDictrictSelect] = useState("");

  const { sendRequest: GetAllAddress, isLoading: getAddressLoading } =
    useGetAddress();

  const {
    sendRequest: UpdateAddress,
    isLoading: updateLoading,
    isSuccess: isSuccessUpdate,
    error: errorUpdate,
  } = useEditShippingAddress();

  const {
    sendRequest: CreateAddress,
    error,
    isLoading,
    isSuccess,
  } = useAddShippingAddress();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddressSchema),
  });

  const {
    onChange: onChangeProvice,
    ref: provinceRef,
    name: provinceName,
  } = register("province");
  const {
    onChange: onChangeDictrict,
    ref: dictrictRef,
    name: dictrictName,
  } = register("dictrict");

  const submitHandler = (data) => {
    if (isEdit) {
      //cập nhật địa chỉ người dùng
      UpdateAddress(addressId, {
        ...data,
        zipcode: 1,
        state: data.dictrict,
        city: data.province,
        country: "VN",
        shipping_address: data.address,
      });
    } else {
      //Tạo địa chỉ người dùng
      CreateAddress({
        ...data,
        zipcode: 1,
        state: data.dictrict,
        city: data.province,
        country: "VN",
        shipping_address: data.address,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Resourse created successfully");
    }
    if (isSuccessUpdate) {
      toast.success("Resourse updated successfully");
    }

    if (error) {
      toast.error(error.error.message);
    }
    if (errorUpdate) {
      toast.error(errorUpdate.error.message);
    }
  }, [error, isSuccess, isSuccessUpdate, errorUpdate]);

  useEffect(() => {
    if (isEdit) {
      const addressFindId = address.find((item) => item.xid === addressId);
      //Nếu người dùng load lại trang hoặc trỏ trực tiếp vào url thì sẽ gọi lại api getAllAddress

      if (!addressFindId) {
        GetAllAddress(addressId);
      } else {
        // hiển thị thông tin địa chỉ đã chọn
        setValue("name", addressFindId.name);
        setValue("phone", addressFindId.phone);
        setValue("email", addressFindId.email);
        setValue("province", addressFindId.city);
        setProvinceSelect(addressFindId.city);
        setDictrictSelect(addressFindId.state);
        setValue("dictrict", addressFindId.state);
        setValue("address", addressFindId.address);
      }
    }
  }, [isEdit, address]);

  return (
    <>
      <div className="border-[2px] border-gray-300 rounded-sm ">
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="border-b-[2px] border-gray-300 py-4 px-3">
            <h2 className="text-xl text-[#333] font-[600]">
              {!isEdit ? "Thêm mới địa chỉ" : "Chỉnh sửa địa chỉ"}
            </h2>
          </div>
          <div className="py-3 px-3">
            {/* name */}
            <div className="flex items-center gap-2 mb-2 text-[#333]">
              <BsPerson size={20} />
              <span className="font-[500]">Họ và tên</span>
            </div>
            <div className="mb-3">
              <TextField
                error={errors.name ? true : false}
                name="name"
                placeholder="Nguyễn Văn Ánh"
                type="text"
                size="small"
                className="w-full "
                {...register("name")}
              />
              <span className="text-red-500 text-sm">
                {errors.name?.message || ""}
              </span>
            </div>
            {/* phonenumber */}
            <div className="flex items-center gap-2 mb-2 text-[#333]">
              <FiPhone size={20} />
              <span className="font-[500]">Số điện thoại</span>
            </div>
            <div className="mb-3">
              <TextField
                error={errors.phone ? true : false}
                name="phone"
                placeholder="0 xxx xxx"
                type="number"
                size="small"
                className="w-full "
                {...register("phone")}
              />
              <span className="text-red-500 text-sm">
                {errors.phone?.message || ""}
              </span>
            </div>

            {/* email */}
            <div className="flex items-center gap-2 mb-2 text-[#333]">
              <TfiEmail size={20} />
              <span className="font-[500]">Địa chỉ email</span>
            </div>
            <div className="mb-3">
              <TextField
                error={errors.email ? true : false}
                name="email"
                placeholder="example@example"
                type="email"
                {...register("email")}
                size="small"
                className="w-full "
              />
              <span className="text-red-500 text-sm">
                {errors.email?.message || ""}
              </span>
            </div>

            {/* province */}
            <div className="flex items-center gap-2 mb-2 text-[#333]">
              <FiMapPin size={20} />
              <span className="font-[500]">Tỉnh, thành phố</span>
            </div>
            <div className="mb-3">
              <Select
                select
                name={provinceName}
                error={errors.province ? true : false}
                size="small"
                defaultValue=""
                value={provinceSelect}
                ref={provinceRef}
                onChange={(e) => {
                  setProvinceSelect(e.target.value);
                  setDictrictSelect("");
                  setValue("dictrict", null);
                  onChangeProvice(e);
                }}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                className="w-full"
              >
                <MenuItem value="">Chọn tỉnh/ thành phố</MenuItem>
                {provinces &&
                  provinces.map((item) => {
                    return (
                      <MenuItem key={item.code} value={item.name}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </Select>
              <span className="text-red-500 text-sm">
                {errors.province?.message || ""}
              </span>
            </div>

            {/* dictrict */}
            <div className="flex items-center gap-2 mb-2 text-[#333]">
              <FiMapPin size={20} />
              <span className="font-[500]">Quận, huyện</span>
            </div>

            <div className="mb-3">
              <Select
                name={dictrictName}
                ref={dictrictRef}
                error={errors.dictrict ? true : false}
                defaultValue=""
                size="small"
                value={dictrictSelect}
                className="w-full"
                placeholder="Chọn quận/ huyện"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                onChange={(e) => {
                  onChangeDictrict(e);
                  setDictrictSelect(e.target.value);
                }}
              >
                <MenuItem value="">Chọn quận/ huyện</MenuItem>
                {provinces &&
                  provinceSelect !== "" &&
                  provinces.find((item) => item.name == provinceSelect) &&
                  provinces
                    .find((item) => item.name == provinceSelect)
                    .districts.map((dictrict) => {
                      return (
                        <MenuItem key={dictrict.code} value={dictrict.name}>
                          {dictrict.name}
                        </MenuItem>
                      );
                    })}
              </Select>
              <span className="text-red-500 text-sm">
                {errors.dictrict?.message || ""}
              </span>
            </div>

            {/* address */}
            <div className="flex items-center gap-2 mb-2 text-[#333]">
              <FiMapPin size={20} />
              <span className="font-[500]">Địa chỉ cụ thể</span>
            </div>
            <div className="mb-5">
              <TextField
                name="address"
                error={errors.address ? true : false}
                placeholder="23 đường số 8,phường Linh Trung"
                type="text"
                {...register("address")}
                size="small"
                className="w-full "
              />
              <span className="text-red-500 text-sm">
                {errors.address?.message || ""}
              </span>
            </div>

            <button
              type="submit"
              className="bg-yellow-400 c font-semibold text-[#333] py-2 px-4 rounded-lg"
            >
              Lưu thông tin
            </button>
          </div>
        </form>
      </div>
      {(isLoading || updateLoading || getAddressLoading) && <Loader />}
    </>
  );
};

export default CreateEditItem;
