"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminNav from '@/components/admin/AdminNav';
import EditProductModal from '@/components/EditProductModal';
import { Trash, Pencil } from 'lucide-react';

export default function DashboardPage() {
  const [productos, setProductos] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null); // Estado para el modal
  const router = useRouter();

  useEffect(() => {
    // 1. Revisar si existe la cookie o el respaldo en LocalStorage
    const loginCookie = document.cookie.split(';').some((item) => item.trim().startsWith('isLoggedIn='));
    const backupAuth = localStorage.getItem('isLoggedIn');

    if (!loginCookie && !backupAuth) {
      router.replace('/login'); // Usa replace para evitar bucles en el historial
    } else {
      cargarProductos();
    }
  }, []);
  const [loading, setLoading] = useState(true);

  const cargarProductos = async () => {
    const res = await fetch('/api/productos');
    const data = await res.json();
    setProductos(data);
    setLoading(false);
  };

  const eliminarProducto = async (id) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este producto?")) return;

    const res = await fetch(`/api/admin/productos?id=${id}`, { method: 'DELETE' });
    
    if (res.ok) {
      // Actualizamos la lista local sin recargar la página
      setProductos(productos.filter(p => p.id_producto !== id));
      alert("Producto eliminado");
    } else {
      alert("Error al eliminar");
    }
  };

  if (loading) return <p className="p-10 text-center">Cargando panel...</p>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
    <AdminNav />
      <div className="flex justify-between items-center my-8">
        <h1 className="text-3xl font-black text-gray-800">Catálogo Admin</h1>
        <Link href="/dashboard/nuevo" className="bg-regalo-verde text-white px-6 py-2 rounded-full font-bold hover:bg-regalo-rosa transition">
          + Agregar Nuevo
        </Link>
      </div>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
      {/* --- VISTA DE ESCRITORIO (TABLA) --- */}
      <table className="w-full text-left hidden md:table">
        <thead className="bg-gray-50 text-gray-400 text-sm uppercase">
          <tr>
            <th className="p-4">Imagen</th>
            <th className="p-4">Producto</th>
            <th className="p-4">Precio</th>
            <th className="p-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {productos.map(p => (
            <tr key={p.id_producto} className="hover:bg-gray-50 transition">
              <td className="p-4">
                <img src={p.imagenes?.split(' | ')[0]} className="w-12 h-12 object-cover rounded-lg" alt="" />
              </td>
              <td className="p-4">
                <div className="font-bold text-gray-700">{p.nombre}</div>
                <div className="text-xs text-gray-400">{p.categoria}</div>
              </td>
              <td className="p-4">
                <div className="font-bold text-regalo-verde">${p.precio_oferta}</div>
                <div className="text-xs text-gray-400 line-through">${p.precio_original}</div>
              </td>
              <td className="p-4">
                <div className="flex gap-2 justify-center">
                  <button onClick={() => setProductoAEditar(p)} className="flex bg-blue-50 text-blue-600 px-3 py-1 rounded-md font-bold items-center hover:bg-blue-100 transition">
                    Editar <Pencil className="ml-2" size={15} />
                  </button>
                  <button onClick={() => eliminarProducto(p.id_producto)} className="flex bg-red-50 text-red-600 px-3 py-1 rounded-md font-bold items-center hover:bg-red-100 transition">
                    Eliminar <Trash className="ml-2" size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
      {/* --- VISTA MÓVIL (TARJETAS DINÁMICAS) --- */}
      <div className="md:hidden divide-y divide-gray-100">
        {productos.map(p => (
          <div key={p.id_producto} className="p-4 flex flex-col gap-4 italic">
            <div className="flex items-center gap-4">
              <img src={p.imagenes?.split(' | ')[0]} className="w-16 h-16 object-cover rounded-xl shadow-sm" alt="" />
              <div className="flex-1">
                <div className="font-black text-gray-800 leading-tight">{p.nombre}</div>
                <div className="text-xs text-gray-400 uppercase font-bold">{p.categoria}</div>
                <div className="mt-1">
                  <span className="font-black text-regalo-verde text-lg">${p.precio_oferta}</span>
                  <span className="text-xs text-gray-400 line-through ml-2">${p.precio_original}</span>
                </div>
              </div>
            </div>
            
            {/* BOTONES DE ACCIÓN EN MÓVIL (Ancho completo para mejor toque) */}
            <div className="flex gap-2">
              <button 
                onClick={() => setProductoAEditar(p)} 
                className="flex-1 flex justify-center items-center gap-2 bg-blue-50 text-blue-600 py-3 rounded-xl font-bold active:scale-95 transition"
              >
                <Pencil size={18} /> Editar
              </button>
              <button 
                onClick={() => eliminarProducto(p.id_producto)} 
                className="flex-1 flex justify-center items-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl font-bold active:scale-95 transition"
              >
                <Trash size={18} /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    
      {productoAEditar && (
        <EditProductModal 
          producto={productoAEditar} 
          onClose={() => setProductoAEditar(null)} 
          onUpdate={cargarProductos} 
        />
      )}
    </div>
    </div>
  );
}