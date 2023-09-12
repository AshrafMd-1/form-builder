import "./index.css";
import { AppRouter } from "./router/AppRouter";
import { useEffect, useState } from "react";
import { me } from "./utils/apiUtils";
import { User } from "./types/userTypes";

const getCurrentUser = async (setCurrentUser: (currentUser: User) => void) => {
  const currentUser = await me();
  setCurrentUser(currentUser.results[0]);
};

function App() {
  const [currentUser, setCurrentUser] = useState<User>(null);
  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return <AppRouter currentUser={currentUser} />;
}

export default App;
