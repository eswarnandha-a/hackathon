// src/routes/InitialRouter.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from "../pages/ChatPage"
import QuestionnaireForm from '../components/QuestionnaireForm';
import HomePage from '../components/HomePage';
import InsightsPage from '../pages/InsightsPage';
import MotivatePage from '../pages/MotivatePage';
import ProfilePage from '../pages/ProfilePage';
import AuthPage from '../pages/AuthPage';
import LandingPage from '../pages/LandingPage';
import InvestmentPage from '../pages/InvestmentPage';
import Layout from '../components/Layout';

const InitialRouter = ({ token, user, handleLogin, handleLogout, handleQuestionnaireComplete }) => {
  const PrivateRoute = ({ children }) => {
    if (!token) {
      console.log("")
      return <Navigate to="/" />;
    }
    if (!user.isQuestionnaireDone && window.location.pathname !== '/questionnaire') {
      return <Navigate to="/questionnaire" />;
    }
    return children;
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/authentication"
        element={<AuthPage onLogin={handleLogin} />}
      />

      {/* Protected routes */}
      <Route
        path="/questionnaire"
        element={
          !token ? (
            <Navigate to="/" />
          ) : user.isQuestionnaireDone ? (
            <Navigate to="/home" />
          ) : (
            <QuestionnaireForm onComplete={handleQuestionnaireComplete} />
          )
        }
      />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Layout onLogout={handleLogout}>
              <HomePage onLogout={handleLogout} />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/insights"
        element={
          <PrivateRoute>
            <Layout onLogout={handleLogout}>
              <InsightsPage />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/investment"
        element={
          <PrivateRoute>
            <Layout onLogout={handleLogout}>
              <InvestmentPage />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/motivate"
        element={
          <PrivateRoute>
            <Layout onLogout={handleLogout}>
              <MotivatePage />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <Layout onLogout={handleLogout}>
              <ChatPage />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Layout onLogout={handleLogout}>
              <ProfilePage onLogout={handleLogout} />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default InitialRouter;