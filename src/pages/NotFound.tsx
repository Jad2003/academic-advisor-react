
import { Link } from "@/utils/router";
import CustomButton from "@/components/ui/CustomButton";
import Header from "@/components/Header";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/">
          <CustomButton>Go Back Home</CustomButton>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
