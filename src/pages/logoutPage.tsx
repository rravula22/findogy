import { removeUserStatus } from '@/utils/middleware';
import { useRouter } from 'next/router';

function LogoutPage() {
  const router = useRouter();

  const handleLogout = () => {
    removeUserStatus();
    router.replace('/login');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default LogoutPage;
