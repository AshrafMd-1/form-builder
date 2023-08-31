import {useRoutes} from "raviger";
import About from "../components/About";
import Form from "../components/Form";
import {AppContainer} from "../AppContainer";
import Home from "../components/Home";
import Preview from "../components/Preview";
import {Error} from "../components/Error";
import {checkFormBasedOnID} from "../utils/utils";

const routes = {
  "/": () => <Home/>,
  "/about": () => <About/>,
  "/forms/:id": ({id}: { id: string }) => {
    if (checkFormBasedOnID(Number(id))) return <Form formId={Number(id)}/>;
    else
      return (
          <Error
              errorMsg="Form Not Found"
              desc="A form with this ID does not exist"
          />
      );
  },
  "/preview/:id": ({id}: { id: string }) => {
    if (checkFormBasedOnID(Number(id))) return <Preview formId={Number(id)}/>;
    else
      return (
          <Error
              errorMsg="Preview Not Found"
              desc="A preview with this ID does not exist"
          />
      );
  },
  "/*": () => (
      <Error
          errorMsg="Page Not Found"
          desc="The page you are looking for does not exist"
      />
  ),
};

export const AppRouter = () => {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
};