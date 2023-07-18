import { Routes, Route } from "react-router-dom";
import Header from "./HeaderComponent/Header";
import Login from "./Login/Login";
import AuthComponent from "./AuthComponent/AuthComponent";
import AuthComponentSuccess from "./AuthComponentSuccess";
import PrivateRoutes from "./PrivateRoutes";
import './App.css'

function App() {
  return (

    <div>
      {console.log(process.env.REACT_APP_HOSTURL)}
      {/* create routes here */}
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/auth' element={<AuthComponent />} />
          <Route path='/auth/success' element={<AuthComponentSuccess />} />
        </Route>
        <Route exact path="/" element={<Login />} />
      </Routes>
    </div>

  );
}

export default App;
