import { FieldArray, FormikProvider, useFormik } from "formik";
import { ChangeEvent } from "react";
import { PrimaryButton } from "../../Buttons/Buttons";

const AddTeams = () => {
  const initialData = {
    teamName: [""],
  };
  const formik = useFormik({
    initialValues: initialData,
    onSubmit: () => {},
  });

  const { values, handleChange } = formik;

  const inputChangeHandler = (e: ChangeEvent) => {
    handleChange(e);
  };

  return (
    <FormikProvider value={formik}>
      <div className="inline-block mt-[10px]">
        <PrimaryButton name="Add Teams" />
      </div>
      <form>
        <FieldArray
          name="teamName"
          render={(arrayHelpers) => {
            return (
              <div>
                <div>
                  <p
                    className="mt-[15px] inline-block text-link hover:underline cursor-pointer"
                    onClick={() => arrayHelpers.push("")}
                  >
                    Add Field
                  </p>
                </div>
                <div className="flex flex-wrap">
                  {values.teamName.map((team, index) => {
                    return (
                      <div className="p-[10px] mx-auto w-[calc(100%/4)]">
                        <div key={index} className="mt-[15px]">
                          <div>
                            <input
                              type="text"
                              name={`teamName[${index}]`}
                              value={formik.values.teamName[index]}
                              onChange={inputChangeHandler}
                              placeholder={`Team ${index + 1} Name`}
                              className="border-[1px] border-primary rounded-[3px] p-[5px] outline-none text-primary"
                            />
                          </div>
                          <p
                            className="mt-[5px] text-link hover:underline cursor-pointer w-full"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            Remove Field
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }}
        />
      </form>
    </FormikProvider>
  );
};

export default AddTeams;
