import {
  getFormDetails,
  getFormFields,
  getSubmission,
} from "../utils/apiUtils";
import React, { useEffect, useState } from "react";
import { initialState } from "./Preview";
import { Error } from "./Error";

export const SubmissionAnswers = (props: {
  formId: number;
  submissionId: number;
}) => {
  const [state, setState] = useState(() => initialState(props.formId));
  const [submission, setSubmission] = useState<any>({});
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getSubmission(props.formId, props.submissionId).then((data) => {
      setSubmission(data);
    });
  }, [props.formId, props.submissionId]);

  useEffect(() => {
    const fetchFormDetailsAndFields = async () => {
      try {
        const form = await getFormDetails(props.formId);
        const formFields = await getFormFields(props.formId).then(
          (data) => data.results,
        );
        setState((state) => ({
          ...state,
          id: form.id,
          title: form.title,
          formFields,
        }));
      } catch (err) {
        setNotFound(true);
        console.error(err);
      }
    };
    fetchFormDetailsAndFields();
  }, [props.formId]);

  if (notFound) {
    return (
      <div className="p-4 border  relative  border-gray-300 mb-3 rounded-lg shadow-md">
        <div className="text-xl font-bold text-center">Submission Answers</div>
        <div className="absolute top-0 right-0 mr-3 mt-4 flex">
          <div className="text-xl font-bold text-center">
            Count : {submission?.answers?.length}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-wrap w-full  m-2 justify-center">
            <div className="grid grid-cols-4 gap-4 m-2 p-2 w-full mx-5  bg-blue-500 text-white items-center rounded-xl  focus:shadow-outline-blue">
              <p className=" ml-3 text-center text-lg col-span-2 break-words font-bold">
                Submission Not Found
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!submission?.answers) {
    return (
      <div className="p-4 border  relative  border-gray-300 mb-3 rounded-lg shadow-md">
        <div className="text-xl font-bold text-center">Submission Answers</div>
        <div className="absolute top-0 right-0 mr-3 mt-4 flex">
          <div className="text-xl font-bold text-center">
            Count : {submission?.answers?.length}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-wrap w-full  m-2 justify-center">
            <div className="grid grid-cols-4 gap-4 m-2 p-2 w-full mx-5  bg-blue-500 text-white items-center rounded-xl  focus:shadow-outline-blue">
              <p className=" ml-3 text-center text-lg col-span-2 break-words font-bold">
                Loading...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!state || !state.formFields)
    return (
      <Error
        errorMsg={"Preview Not Available"}
        desc={"This form is not available for preview"}
      />
    );

  if (state.formFields.length === 0)
    return (
      <Error
        errorMsg={"Preview Not Available"}
        desc={"This form has no fields"}
      />
    );

  return (
    <div className="p-4 border  relative  border-gray-300 mb-3 rounded-lg shadow-md">
      <div className="text-xl font-bold text-center">Submission Answers</div>
      <div className="absolute top-0 right-0 mr-3 mt-4 flex">
        <div className="text-xl font-bold text-center">
          Count : {submission?.answers?.length}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-wrap w-full  m-2 justify-center">
          {submission?.answers?.map((answer: any, index: number) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 m-2 p-2 w-full mx-5  bg-gray-500 text-white items-center rounded-xl  focus:shadow-outline-blue"
            >
              <p className=" ml-3 text-center text-lg col-span-2 break-words font-bold">
                {state.formFields[index].label}
              </p>
              <div className="flex col-span-2 justify-center items-center gap-2 flex-wrap">
                <p className="text-center text-lg break-words font-bold">
                  {answer.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
