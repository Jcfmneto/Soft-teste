import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdicionaLivro from "./pages/AdicionarLivros";
import PrivateRoute from "./components/privateRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/AdicionarLivros" element={<PrivateRoute> <AdicionaLivro /> </PrivateRoute>} />
    </Routes>
  );
}

export default App;
