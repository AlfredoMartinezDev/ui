import { BrowserRouter as Router } from "react-router-dom"
import AuthenticatedApp from "./pages/AuthenticatedApp";

function App() {
  return (
    <>
      <Router>
        <AuthenticatedApp />
      </Router>
    </>
  );
}

export default App
