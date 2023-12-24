import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import ProtectedRoute from './ProtectedRoute';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const Dashboard = () => {
  return <h2>Dashboard</h2>;
}

const App = () => {
  return (
    <Router>
      {/* <Switch> */}
      <Routes>
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        {/* Add other routes here */}
        <Navigate from="/" to="/login" />
        </Routes>
      {/* </Switch> */}
    </Router>
  );
}

export default App;
