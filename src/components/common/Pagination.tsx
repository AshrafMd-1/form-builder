import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { PaginationData } from "../../types/common";

export const Pagination = (props: {
  pageData: PaginationData;
  setPageDataCB: (value: PaginationData) => void;
}) => {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        {props.pageData.offset >= 10 ? (
          <button
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => {
              props.setPageDataCB({
                offset: props.pageData.offset - 10,
                limit: 10,
                totalCount: props.pageData.totalCount,
              });
            }}
          >
            Previous
          </button>
        ) : null}
        {props.pageData.offset + 10 < props.pageData.totalCount ? (
          <button
            className="relative ml-auto inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => {
              props.setPageDataCB({
                offset: props.pageData.offset + 10,
                limit: 10,
                totalCount: props.pageData.totalCount,
              });
            }}
          >
            Next
          </button>
        ) : null}
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">{props.pageData.offset + 1}</span> to{" "}
            <span className="font-medium">{props.pageData.offset + 10}</span> of{" "}
            <span className="font-medium">{props.pageData.totalCount}</span>{" "}
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {props.pageData.offset >= 10 ? (
              <button
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={() => {
                  props.setPageDataCB({
                    offset: props.pageData.offset - 10,
                    limit: 10,
                    totalCount: props.pageData.totalCount,
                  });
                }}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            ) : null}

            {Array.from(
              Array(Math.ceil(props.pageData.totalCount / 10)).keys(),
            ).map((i) => {
              return (
                <button
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  style={{
                    backgroundColor:
                      props.pageData.offset === i * 10 ? "blue" : "white",
                    color: props.pageData.offset === i * 10 ? "white" : "blue",
                  }}
                  onClick={() => {
                    props.setPageDataCB({
                      offset: i * 10,
                      limit: 10,
                      totalCount: props.pageData.totalCount,
                    });
                  }}
                >
                  {i + 1}
                </button>
              );
            })}

            {props.pageData.offset + 10 < props.pageData.totalCount ? (
              <button
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={() => {
                  props.setPageDataCB({
                    offset: props.pageData.offset + 10,
                    limit: 10,
                    totalCount: props.pageData.totalCount,
                  });
                }}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            ) : null}
          </nav>
        </div>
      </div>
    </div>
  );
};