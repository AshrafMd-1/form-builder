import { useRoutes } from "raviger";
import React from "react";
import { Submission } from "../components/Submission";
import { SubmissionAnswers } from "../components/SubmissionAnswers";
import { Error } from "../components/Error";
import { AppContainer } from "../AppContainer";
import { User } from "@sentry/react";
import { ReactLoadingScreen } from "../components/ReactLoadingScreen";

const Home = React.lazy(() => import("../components/Home"));
const About = React.lazy(() => import("../components/About"));
const Form = React.lazy(() => import("../components/Form"));
const Preview = React.lazy(() => import("../components/Preview"));
const Login = React.lazy(() => import("../components/Login"));

const routes = {
  "/": () => (
    <React.Suspense fallback={<ReactLoadingScreen />}>
      <Home />
    </React.Suspense>
  ),
  "/about": () => (
    <React.Suspense fallback={<ReactLoadingScreen />}>
      <About />
    </React.Suspense>
  ),
  "/login": () => (
    <React.Suspense fallback={<ReactLoadingScreen />}>
      <Login />
    </React.Suspense>
  ),
  "/forms/:id": ({ id }: { id: string }) => (
    <React.Suspense fallback={<ReactLoadingScreen />}>
      <Form formId={Number(id)} />
    </React.Suspense>
  ),
  "/preview/:id": ({ id }: { id: string }) => (
    <React.Suspense fallback={<ReactLoadingScreen />}>
      <Preview formId={Number(id)} />
    </React.Suspense>
  ),
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
