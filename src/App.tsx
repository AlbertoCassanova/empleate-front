// React
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Views
import AuthView from './views/AuthView';
import HomeView from './views/HomeView';

// Components
import { ProtectedRoute } from './components/ProtectedRoute';
import Navbar from './components/home/Navbar';
import MapView from './views/MapView';
import Menu from './components/home/Menu';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      {localStorage.getItem('token') && <Navbar />}
      <div className='flex'>
        {localStorage.getItem('token') && <Menu />}
        <Routes>
          <Route element={<ProtectedRoute isAllowed={!localStorage.getItem('token')} redirectTo='/home' />}>
            <Route path='/' element={<AuthView />} />
          </Route>
          <Route element={<ProtectedRoute isAllowed={localStorage.getItem('token')} />}>
            <Route path="/home" element={<HomeView />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/*" element={<Navigate to={'/home'} replace />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
