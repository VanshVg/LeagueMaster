import { useFormik } from "formik";
import { IUpdateLeagueProps } from "../../../types/types";
import Input from "../../Form/Input";
import { ChangeEvent } from "react";

const UpdateLeague = ({ leagueData }: IUpdateLeagueProps) => {
  const initialData = {
    leagueName: "",
    leagueType: "",
  };

  const { errors, values, touched, handleBlur, handleChange, submitForm, resetForm, setErrors } =
    useFormik({
      initialValues: initialData,
      onSubmit: () => {},
    });

  const handleInputChange = (e: ChangeEvent): void => {
    handleChange(e);
  };

  return (
    <div>
      {/* <form>
        <div className="mt-[10px] max-w-[80%] flex gap-[15px] mx-auto">
          <div className="w-[50%]">
            <Input
              type="text"
              id="league-name"
              value={values.leagueName}
              onChange={handleChange}
              onBlur={handleBlur}
              label="League Name"
              errors={errors.leagueName}
              touched={touched.leagueName}
            />
          </div>
          <div className="w-[50%]">
            <Input
              type="text"
              id="league-name"
              value={values.leagueName}
              onChange={handleChange}
              onBlur={handleBlur}
              label="League Name"
              errors={errors.leagueName}
              touched={touched.leagueName}
            />
          </div>
        </div>
      </form> */}
    </div>
  );
};

export default UpdateLeague;
