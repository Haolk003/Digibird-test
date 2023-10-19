import * as yup from "yup";

export const AddressSchema = yup.object({
  name: yup.string().required("Họ và tên không được để trống"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  phone: yup.string().required("Số điện thoại không được để trống"),
  province: yup.string().required("Vui lòng chọn tỉnh/ thành phố "),
  dictrict: yup.string().required("Vui lòng chọn quận/ huyện"),
  address: yup.string().required("Địa chỉ không được để trống"),
});
