import { useRoutes } from "raviger";
import About from "../components/About";
import Form from "../components/Form";
import { AppContainer } from "../AppContainer";
import Home from "../components/Home";
import Preview from "../components/Preview";
import { Error } from "../components/Error";
import Login from "../components/Login";
import { User } from "../types/userTypes";
import { Submission } from "../components/Submission";
import { SubmissionAnswers } from "../components/SubmissionAnswers";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/login": () => <Login />,
  "/forms/:id": ({ id }: { id: string }) => <Form formId={Number(id)} />,
  "/preview/:id": ({ id }: { id: string }) => <Preview formId={Number(id)} />,
  "/submissions/:id": ({ id }: { id: string }) => (
    <Submission formId={Number(id)} />
  ),
  "/submissions/:formId/answer/:id": ({
    formId,
    id,
  }: {
    formId: string;
    id: string;
  }) => <SubmissionAnswers formId={Number(formId)} submissionId={Number(id)} />,
  "/*": () => (
    <Error
      errorMsg="Page Not Found"
      desc="The page you are looking for does not exist"
    />
  ),
};

export const AppRouter = (props: { currentUser: User }) => {
  let routeResult = useRoutes(routes);
  return (
    <AppContainer currentUser={props.currentUser}>{routeResult}</AppContainer>
  );
};
