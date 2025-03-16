import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import InitialRouter from './router/InitialRouter';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: 
    radial-gradient(circle at 0% 0%, #133033 0%, transparent 35%),
    radial-gradient(circle at 100% 0%, #1b2a38 0%, transparent 35%),
    radial-gradient(circle at 100% 100%, #083329 0%, transparent 35%),
    radial-gradient(circle at 0% 100%, #010b13 0%, transparent 35%),
    #010b13;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));

  const handleLogin = (userData, authToken) => {
    setToken(authToken);
    setUser(userData);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setToken(null);
    setUser({});
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const handleQuestionnaireComplete = async (questionnaireData) => {
    try {
      const response = await fetch('https://hack-backend-rzgv.onrender.com/api/questionnaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(questionnaireData),
      });

      if (!response.ok) {
        throw new Error('Failed to save questionnaire');
      }

      const data = await response.json();
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      console.error('Error saving questionnaire:', error);
    }
  };

  return (
    <Router>
      <AppContainer>
        <InitialRouter
          token={token}
          user={user}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          handleQuestionnaireComplete={handleQuestionnaireComplete}
        />
      </AppContainer>
    </Router>
  );
}

export default App;