import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export default (...classes) => {
  return twMerge(clsx(classes));
};
