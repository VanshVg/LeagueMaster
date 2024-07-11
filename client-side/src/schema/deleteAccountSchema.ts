import * as Yup from "yup";

const deleteAccountSchema = () => {
  let schema = Yup.object();
  schema = schema.shape({
    currentPassword: Yup.string()
      .trim()
      .required("Please enter current password")
      .min(6, "Password must have at least six characters")
      .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@_)(#$%^&*]{6,16}$/, {
        message: "At least one number and one special character are must",
      }),
  });
  return schema;
};

export default deleteAccountSchema;
