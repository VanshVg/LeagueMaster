import * as Yup from "yup";

const updatePasswordSchema = () => {
  let schema = Yup.object();
  schema = schema.shape({
    currentPassword: Yup.string()
      .trim()
      .required("Please enter password")
      .min(6, "Password must have at least six characters")
      .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@_)(#$%^&*]{6,16}$/, {
        message: "At least one number and one special character are must",
      }),
    newPassword: Yup.string()
      .trim()
      .required("Please enter password")
      .min(6, "Password must have at least six characters")
      .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@_)(#$%^&*]{6,16}$/, {
        message: "At least one number and one special character are must",
      }),
    confirmPassword: Yup.string()
      .trim()
      .required("Please enter confirm password")
      .oneOf([Yup.ref("newPassword")], "New Password and Confirm password must be same"),
  });
  return schema;
};

export default updatePasswordSchema;
