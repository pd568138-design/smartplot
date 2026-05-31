
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddPlot from "./pages/AddPlot";
import SearchPlot from "./pages/SearchPlot";

function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/add-plot"
          element={<AddPlot />}
        />

        <Route
          path="/search-plot"
          element={<SearchPlot />}
        />

      </Routes>

    </BrowserRouter>

  )

}

export default App;
