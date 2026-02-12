import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { DocumentProvider } from "./src/context/DocumentContext";
import { UserProvider } from "./src/context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <DocumentProvider>
        <AppNavigator />
      </DocumentProvider>
    </UserProvider>
  );
};

export default App;
