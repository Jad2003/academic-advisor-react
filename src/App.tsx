
import { RouterProvider, useRouter } from "./utils/router";
import Index from "./pages/Index";
import GradesAnalysis from "./pages/GradesAnalysis";
import PersonalityAssessment from "./pages/PersonalityAssessment";
import About from "./pages/About";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const AppRouter = () => {
  const { currentPath } = useRouter();

  const routes: { [key: string]: React.ComponentType } = {
    '/': Index,
    '/grades-analysis': GradesAnalysis,
    '/personality-assessment': PersonalityAssessment,
    '/about': About,
    '/help': Help,
    '/contact': Contact,
    '/login': Login,
    '/signup': Signup,
  };

  const Component = routes[currentPath] || NotFound;

  return <Component />;
};

const App = () => (
  <RouterProvider>
    <AppRouter />
  </RouterProvider>
);

export default App;
