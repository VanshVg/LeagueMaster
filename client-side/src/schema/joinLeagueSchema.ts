import * as Yup from "yup";

const joinLeagueSchema = () => {
  let schema = Yup.object();
  schema = schema.shape({
    leagueCode: Yup.string().trim().required("Please enter League joining code"),
  });
  return schema;
};

export default joinLeagueSchema;
