// React
import { lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { setUser } from './app/feature/user/UserSlice';

// Apollo Graphql
import { OperationVariables, useLazyQuery } from '@apollo/client';
import { GET_USER_INFO } from './graphql/User.queries';

// Views
const AuthView = lazy(() => import('./views/AuthView'));
const BusinessView = lazy(() => import('./views/BusinessView'));
const ConfigView = lazy(() => import('./views/ConfigView'));
const HomeView = lazy(() => import('./views/HomeView'));
const MapView = lazy(() => import('./views/MapView'));
const ProfileVIew = lazy(() => import('./views/ProfileVIew'));

// Components
import { ProtectedRoute } from './components/ProtectedRoute';
import Navbar from './components/home/Navbar';
import Menu from './components/home/Menu';

function App(): JSX.Element {
  const dispatch = useDispatch()
  // Graphql queries
  const [getUserInfo] = useLazyQuery<any, OperationVariables>(GET_USER_INFO);

  const queryUserLogged = async() : Promise<void> => {
    const queryGetUserInfo = await getUserInfo({ variables: { token: localStorage.getItem('token') } })
    dispatch(setUser(queryGetUserInfo.data.getUserInfo))
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      queryUserLogged();
    }
  }, [])
  return (
    <BrowserRouter>
      {localStorage.getItem('token') && <Navbar />}
      <div className={`${localStorage.getItem('token') && "flex"}`}>
        {localStorage.getItem('token') && <Menu />}
        <Routes>
          <Route element={<ProtectedRoute isAllowed={!localStorage.getItem('token')} redirectTo='/home' />}>
            <Route path='/' element={<AuthView />} />
          </Route>
          <Route element={<ProtectedRoute isAllowed={localStorage.getItem('token')} />}>
            <Route path="/home" element={<HomeView />} />
            <Route path="/map/:option?/:id?" element={<MapView />} />
            <Route path="/business" element={<BusinessView />} />
            <Route path="/profile" element={<ProfileVIew />} />
            <Route path="/config" element={<ConfigView />} />
            <Route path="/*" element={<Navigate to={'/home'} replace />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
