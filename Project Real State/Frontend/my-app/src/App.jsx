// import { useState } from 'react'
// import './App.css'
// import NavBar from './components/NavBar'
// import AuthProvider from './context/AuthContext'
// import { Routes , Route } from 'react-router-dom'
// import Login from './pages/Login'

// function App() {


//   return (
//     <AuthProvider>
//       <NavBar/>
//       <Routes>
//       <Route path="/login" element={<Login/>} />
//       </Routes>
//     </AuthProvider>
 
//   )
// }

// export default App










import { Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Favorites from "./pages/Favorites";
import SavedSearches from "./pages/SavedSearches";
import Notifications from "./pages/Notifications";
import SellerDashboard from "./pages/SellerDashboard";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import EMICalculator from "./components/Emi";

export default function App() {
  return (
    <AuthProvider>
      <NavBar />
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/emi" element={<EMICalculator/>} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />

          <Route
            path="/favorites"
            element={<ProtectedRoute roles={["buyer"]}><Favorites /></ProtectedRoute>}
          />
          <Route
            path="/saved-searches"
            element={<ProtectedRoute roles={["buyer"]}><SavedSearches /></ProtectedRoute>}
          />
          <Route
            path="/notifications"
            element={<ProtectedRoute roles={["buyer","seller","agent","admin"]}><Notifications /></ProtectedRoute>}
          />
          <Route
            path="/seller"
            element={<ProtectedRoute roles={["seller","agent"]}><SellerDashboard /></ProtectedRoute>}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute roles={["buyer","seller","agent","admin"]}><Profile /></ProtectedRoute>}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
