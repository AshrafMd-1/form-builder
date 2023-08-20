import { useRoutes } from "raviger";
import About from "../components/About";
import Form from "../components/Form";
import { AppContainer } from "../AppContainer";
import Home from "../components/Home";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,

  "/forms/:id": ({ id }: { id: string }) => <Form formId={Number(id)} />,
};

export const AppRouter = () => {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
};
