"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
  
    const data = await res.json();
  
    if (res.ok && data.success) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('admin_name', data.user.nombre);
      
      router.push('/dashboard');
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-2xl font-black mb-6 text-regalo-rosa">ADMIN PINK SHOP</h1>
        <input 
          type="email" placeholder="Email" className="w-full mb-4 p-3 border rounded-xl"
          onChange={(e) => setForm({...form, email: e.target.value})}
        />
        <input 
          type="password" placeholder="Contraseña" className="w-full mb-6 p-3 border rounded-xl"
          onChange={(e) => setForm({...form, password: e.target.value})}
        />
        <button className="w-full bg-regalo-rosa text-white py-3 rounded-xl font-bold">Entrar</button>
      </form>
    </div>
  );
}