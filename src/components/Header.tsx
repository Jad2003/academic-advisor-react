
import CustomButton from "./ui/CustomButton";
import GraduationCap from "./icons/GraduationCap";
import User from "./icons/User";
import LogIn from "./icons/LogIn";
import { Link } from "../utils/router";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">EduGuide AI</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              About Us
            </Link>
            <Link to="/help" className="text-gray-600 hover:text-blue-600 transition-colors">
              Help
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact Us
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Link to="/login">
              <CustomButton variant="ghost" className="text-gray-600 hover:text-blue-600">
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </CustomButton>
            </Link>
            <Link to="/signup">
              <CustomButton className="bg-blue-600 hover:bg-blue-700 text-white">
                <User className="h-4 w-4 mr-2" />
                Sign Up
              </CustomButton>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
