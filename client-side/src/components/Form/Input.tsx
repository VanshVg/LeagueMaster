import { useState } from "react";
import { IInputProps } from "../../types/types";

const Input = ({ type, id, value, onChange, onBlur, label, errors, touched }: IInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const showPasswordHandler = (): void => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="">
      <div className="flex">
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : type}
            id={id}
            className="block  px-2.5 pb-2.5 pt-4 w-full h-[40px] text-sm text-primary bg-transparent rounded-lg border-[1px] border-primary appearance-none dark:text-primary focus:text-primary dark:border-primary dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer mx-auto z-10"
            placeholder=""
            autoComplete="off"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
          <label
            htmlFor={id}
            className="absolute text-sm text-primary dark:text-primary duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text mx-auto"
          >
            {label}
          </label>
        </div>
        {type === "password" && (
          <div className="-ml-[30px] mt-[8px] z-10">
            {showPassword ? (
              <img
                src="/icons/eye-show.svg"
                className="cursor-pointer"
                alt=""
                onClick={showPasswordHandler}
              />
            ) : (
              <img
                src="/icons/eye-hidden.svg"
                className="cursor-pointer"
                alt=""
                onClick={showPasswordHandler}
              />
            )}
          </div>
        )}
      </div>
      {errors && touched && (
        <p className="-mb-[12px] mt-[2px] text-left text-[15px] text-red">{errors}</p>
      )}
    </div>
  );
};

export default Input;
