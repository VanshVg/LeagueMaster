import * as Yup from "yup";

const leagueSchema = () => {
  let schema = Yup.object();
  schema = schema.shape({
    leagueName: Yup.string().trim().required("Please enter League name"),
    type: Yup.string().trim().required("Please enter League type"),
  });
  return schema;
};

export default leagueSchema;
