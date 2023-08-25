import {useRoutes} from "raviger";
import About from "../components/About";
import Form from "../components/Form";
import {AppContainer} from "../AppContainer";
import Home from "../components/Home";
import Preview from "../components/Preview";
import {Error} from "../components/Error";

const routes = {
  "/": () => <Home/>,
  "/about": () => <About/>,
  "/forms/:id": ({id}: { id: string }) => <Form formId={Number(id)}/>,
  "/preview/:id": ({id}: { id: string }) => <Preview formId={Number(id)}/>,
  "/*": () => <Error/>,
};

export const AppRouter = () => {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
};