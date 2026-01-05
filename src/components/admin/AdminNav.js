"use client";
import { useRouter } from 'next/navigation';

export default function AdminNav() {
  const router = useRouter();

  const handleLogout = () => {
    // 1. Limpiar Cookie (haciendo que expire inmediatamente)
    document.cookie = "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // 2. Limpiar LocalStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('admin_name');

    // 3. Redirigir al Login
    router.replace('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-4 px-8 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-regalo-rosa rounded-full animate-pulse"></div>
        <span className="font-black text-gray-800 tracking-tight">
          <a href='/'>
            PINK SHOP 
          </a>
        </span>
      </div>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={handleLogout}
          className="text-sm font-bold text-red-500 hover:text-red-700 transition flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}