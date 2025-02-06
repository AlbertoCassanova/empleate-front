// React
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Views
import AuthView from './views/AuthView';
import HomeView from './views/HomeView';

// Components
import { ProtectedRoute } from './components/ProtectedRoute';
import Navbar from './components/home/Navbar';

function App() : JSX.Element {
  return (
    <BrowserRouter>
      {localStorage.getItem('token') && <Navbar />}
      <Routes>
        <Route element={<ProtectedRoute isAllowed={!localStorage.getItem('token')} redirectTo='/home' />}>
          <Route path='/' element={<AuthView />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={localStorage.getItem('token')} />}>
          <Route path="/home" element={<HomeView />} />
          <Route path="/*" element={<Navigate to={'/home'} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
