import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.jpeg";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-slate-400 via-indigo-400 to-slate-600
 shadow-xl backdrop-blur-lg bg-opacity-90 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left side: logo + links */}
          <div className="flex items-center space-x-8">
            {/* Logo with hover animation */}
            <Link to="/" className="flex items-center group">
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-auto rounded-full shadow-md transform group-hover:scale-110 transition duration-300 ease-in-out"
              />
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6">
              <NavItem to="/" label="Home" />
              <NavItem to="/emi" label="EMI_Calculator" />
              <NavItem to="/properties" label="Properties" />

              {user?.role === "buyer" && (
                <>
                  <NavItem to="/favorites" label="Favorites" />
                  <NavItem to="/saved-searches" label="Saved Searches" />
                </>
              )}

              <NavItem to="/notifications" label="Notifications" />

              {user?.role !== "buyer" &&
                (user?.role === "seller" || user?.role === "agent") && (
                  <NavItem to="/seller" label="Seller Dashboard" />
                )}
            </div>
          </div>

          {/* Right side auth links */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <NavItem to="/profile" label="Profile" />

                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-full bg-red-500 text-white font-medium shadow-md 
                  hover:bg-red-600 hover:shadow-lg transform hover:-translate-y-0.5 
                  transition-all duration-300 ease-in-out"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full bg-white text-indigo-600 font-semibold shadow-md
                  hover:bg-gray-100 hover:shadow-lg transform hover:-translate-y-0.5 
                  transition-all duration-300 ease-in-out"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-full bg-yellow-400 text-gray-900 font-semibold shadow-md
                  hover:bg-yellow-500 hover:shadow-lg transform hover:-translate-y-0.5 
                  transition-all duration-300 ease-in-out"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* Reusable NavItem Component */
function NavItem({ to, label }) {
  return (
    <Link
      to={to}
      className="relative text-white font-medium tracking-wide 
      after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-yellow-400 after:left-0 after:-bottom-1
      after:transition-all after:duration-300 hover:after:w-full
      hover:text-yellow-300 transition-colors duration-300"
    >
      {label}
    </Link>
  );
}
