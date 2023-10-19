import { atom } from "recoil";

const addressState = atom({
  key: "addressState",
  default: [],
});

export default addressState;
