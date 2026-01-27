import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardPage, UploadVideo, Home, CrearEstancia } from "./pages";
import PrivateRoute from "./routes/PrivateRoute";
import DocumentacionPage from "./pages/Documentacion";
import ReseumenPage from "./pages/Resumen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doc" element={<DocumentacionPage />} />
        <Route
          path="/crear-estancia"
          element={
            <PrivateRoute>
              <CrearEstancia />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload-video"
          element={
            <PrivateRoute>
              <UploadVideo />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/resumen"
          element={
            <PrivateRoute>
              <ReseumenPage />
            </PrivateRoute>
          }
        />
      
      </Routes>
    </Router>
  );
}

export default App;
