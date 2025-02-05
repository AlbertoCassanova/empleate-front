import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthView from './views/AuthView'
import HomeView from './views/HomeView'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute isAllowed={!localStorage.getItem('usuario')} redirectTo='/home' />}>
          <Route path='/' element={<AuthView />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={localStorage.getItem('usuario')} />}>
          <Route path="/home" element={<HomeView />} />
          <Route path="/*" element={<Navigate to={'/home'} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
