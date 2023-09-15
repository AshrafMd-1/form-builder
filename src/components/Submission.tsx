import { useEffect, useState } from "react";
import { getFormSubmissions } from "../utils/apiUtils";
import { navigate } from "raviger";

export const Submission = (props: { formId: number }) => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getFormSubmissions(props.formId).then((data) => {
      setSubmissions(data.results);
    });
  }, []);

  return (
    <div className="p-4 border  relative  border-gray-300 mb-3 rounded-lg shadow-md">
      <div className="text-xl font-bold text-center">Submissions</div>
      <div className="absolute top-0 right-0 mr-3 mt-4 flex">
        <div className="text-xl font-bold text-center">
          Count : {submissions.length}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-wrap w-full  m-2 justify-center">
          {submissions.map((submission: any, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 m-2 p-2 w-full mx-5  bg-blue-500 text-white items-center rounded-xl  focus:shadow-outline-blue"
            >
              <p className=" ml-3 text-center text-lg col-span-2 break-words font-bold">
                Submission - {index + 1}
              </p>
              <div className="flex col-span-2 justify-center items-center gap-2 flex-wrap">
                <button
                  className="bg-green-500 font-bold  rounded-lg hover:bg-green-600 px-3 py-1"
                  onClick={() => {
                    navigate(
                      "/submissions/" +
                        props.formId +
                        "/answer/" +
                        submission.id,
                    );
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
