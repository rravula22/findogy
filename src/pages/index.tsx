import Header from '../components/Header';
import { useAuth } from './AuthContext';
import Dashboard from './dashboard';
import Login from './login';
export default function Home() {
  const { user } = useAuth();
  return (<>
      <Header />
      {
        user ? <Dashboard /> : <Login />
      }
    </>
  )
}