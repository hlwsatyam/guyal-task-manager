import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import TodoApp from "./component/TodoApp";
import Navbar from "./component/Navbar";
import Login from "./Auth/Login";
import UserProtected from "./Protected/userProtected";
import Signup from "./Auth/Signup";
import Logout from "./Auth/Logout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<UserProtected child={<TodoApp />} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
