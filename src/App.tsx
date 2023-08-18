import React from "react";
import { AppContainer } from "./AppContainer";
import { Header } from "./Header";
import Input from "./Input";

const formFields = [
  { id: 1, label: "First Name", type: "text" },
  { id: 2, label: "Last Name", type: "text" },
  { id: 3, label: "Email", type: "email" },
  { id: 4, label: "Date of Birth", type: "date" },
  { id: 5, label: "Phone Number", type: "text" },
];

function App() {
  return (
    <AppContainer>
      <div className="p-5 mx-auto max-w-2xl bg-white shadow-lg rounded-xl">
        <Header
          title={"Welcome to Lesson 5 #react-typescript with #tailwindcss"}
        />
        <form>
          {formFields.map((field) => (
            <Input key={field.id} field={field.label} type={field.type} />
          ))}
          <button className="bg-blue-500 hover:bg-blue-700 text-white mt-3 font-bold py-2 px-4 rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </AppContainer>
  );
}

export default App;
