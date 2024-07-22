import * as Yup from "yup";

const updateResultSchema = () => {
  let schema = Yup.object();
  schema = schema.shape({
    home_team_score: Yup.number()
      .typeError("Please enter valid score")
      .required("Please enter home team score"),
    away_team_score: Yup.number()
      .typeError("Please enter valid score")
      .required("Please enter away team score"),
  });
  return schema;
};

export default updateResultSchema;
