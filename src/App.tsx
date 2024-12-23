import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { client } from "./lib/apollo-client";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
