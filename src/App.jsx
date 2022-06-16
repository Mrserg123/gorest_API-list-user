import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./components/Users/Users";
import Home from "./components/Home/Home";
import Error404 from "./components/Error_404/Error404";
import Edit from "./components/Users/Edit/Edit";
import { Context } from "./components/Context/Context";

function App() {
  const [context, setContext] = React.useState({});
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/users"
          element={
            <Context.Provider value={[context, setContext]}>
              <Users />
            </Context.Provider>
          }
        />
        <Route
          path="/edit"
          element={
            <Context.Provider value={[context, setContext]}>
              <Edit />
            </Context.Provider>
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
