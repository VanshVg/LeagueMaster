import * as Yup from "yup";

const verifySchema = () => {
  let schema = Yup.object();
  schema = schema.shape({
    username: Yup.string().trim().required("Please enter Username"),
  });
  return schema;
};

export default verifySchema;
