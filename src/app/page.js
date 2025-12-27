"use client";
import { useState } from 'react';
import data from '../data/productos.json';

export default function Home() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const redes = [
    { nombre: 'Facebook', url: 'https://facebook.com/tiempopararegalar', color: 'text-blue-600 hover:text-blue-800' },
    { nombre: 'Instagram', url: 'https://instagram.com/tiempopararegalar', color: 'text-pink-500 hover:text-pink-700' },
    { nombre: 'WhatsApp', url: 'https://wa.me/1234567890', color: 'text-green-500 hover:text-green-700' },
    { nombre: 'TikTok', url: 'https://tiktok.com/@tiempopararegalar', color: 'text-black hover:text-gray-800' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      
      {/* HEADER - Inspirado en el círculo azul celeste del logo */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-regalo-azul-c shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full border-2 border-regalo-rosa flex items-center justify-center font-bold text-regalo-rosa">
              <img src="https://res-console.cloudinary.com/dzgqpqv9f/thumbnails/v1/image/upload/v1766853724/V2hhdHNBcHBfSW1hZ2VfMjAyNS0xMi0yNl9hdF84LjQ0LjM3X3AubS5fMV90Z2JjN2M=/template_primary/ZV9iYWNrZ3JvdW5kX3JlbW92YWwvY19jcm9wLHdfODAwLGhfODAwLGFyXzE6MSxmX3BuZw==" alt="Logo Tiempo Para Regalar" className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-black tracking-tighter">
              <span className="text-regalo-azul-r">TIEMPO PARA</span> <span className="text-regalo-rosa">REGALAR</span>
            </h1>
          </div>
          <nav className="hidden md:flex gap-6 font-medium text-regalo-azul-r">
            <a href="#productos" className="hover:text-regalo-verde transition">Productos</a>
            <a href="#promociones" className="hover:text-regalo-verde transition">Promociones</a>
            <a href="#contacto" className="hover:text-regalo-verde transition">Contacto</a>
          </nav>
        </div>
      </header>

      {/* PRODUCTOS */}
      <section className="max-w-7xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">
        Nuestros <span className="text-regalo-verde">productos</span>
      </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.productos.map((producto) => (
            <TarjetaProducto 
              key={producto.id} 
              producto={producto} 
              onOpenModal={() => setProductoSeleccionado(producto)}
            />
          ))}
        </div>
      </section>
            {/* MODAL DE DETALLE */}
            {productoSeleccionado && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
                  <button 
                    onClick={() => setProductoSeleccionado(null)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-regalo-rosa text-2xl font-bold"
                  >✕</button>
                  
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                      <img src={productoSeleccionado.imagenes[0]} alt={productoSeleccionado.nombre} className="w-full h-full object-cover" />
                    </div>
                    <div className="md:w-1/2 p-8">
                      <span className="text-regalo-azul-c font-bold text-sm uppercase">{productoSeleccionado.categoria}</span>
                      <h3 className="text-3xl font-black text-regalo-azul-r mt-2">{productoSeleccionado.nombre}</h3>
                      <p className="text-gray-600 mt-4">{productoSeleccionado.descripcion}</p>
                      <div className="mt-6">
                        <p className="font-bold">Colores disponibles:</p>
                        <div className="flex gap-2 mt-2">
                          {productoSeleccionado.colores.map(c => (
                            <span key={c} className="px-3 py-1 bg-gray-100 rounded-full text-xs border border-gray-200">{c}</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-4xl font-black text-regalo-verde mt-8">${productoSeleccionado.precio}</p>
                      <button className="mt-6 w-full bg-regalo-rosa text-white py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg">
                        Contactar por WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

      {/* SECCIÓN PROMOCIONES - Color Rosa del Logo */}
      <section id="promociones" className="bg-regalo-rosa py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-6 italic underline decoration-regalo-verde">¡PROMO DE FIN DE AÑO!</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 font-light">
            Encuentra el detalle perfecto con un 15% de descuento en tu primera compra usando el código 
            <span className="font-bold block text-3xl mt-2 tracking-widest text-regalo-azul-r">REGALOFIN2025</span>
          </p>
        </div>
      </section>

      {/* CONTACTO Y REDES - Iconos simulados con texto */}
      <section id="contacto" className="py-16 bg-gray-50 border-t">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h3 className="text-2xl font-bold text-regalo-azul-r mb-8 text-center">Conéctate con Nosotros</h3>
          <div className="flex gap-8 mb-12">
            {data.redes.map((red) => (
              <a key={red.nombre} href={red.url} target='_blank' className={`text-lg font-bold transition-colors ${red.color}`}>
                {red.nombre}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-regalo-azul-c text-white py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="font-bold text-regalo-verde mb-4">TIEMPO PARA REGALAR</h4>
            <p className="text-sm opacity-80">Haciendo que cada segundo cuente con el regalo ideal.</p>
          </div>
          <div>
            <h4 className="font-bold text-regalo-azul-c mb-4">UBICACIÓN</h4>
            <p className="text-sm opacity-80">Tonalá, Chiapas<br/>C.P. 30500</p>
          </div>
          <div>
            <h4 className="font-bold text-regalo-rosa mb-4">HORARIOS</h4>
            <p className="text-sm opacity-80">Lun - Vie: 9am a 8pm<br/>Sábados: 10am a 4pm</p>
          </div>
        </div>
        <div className="mt-12 text-center text-xs opacity-80 border-t border-white/20 pt-6">
          © 2025 Tiempo Para Regalar. Diseñado por <a href='https://servitectonala.com' className='font-bold text-regalo-rosa' target='_blank'>SERVITEC.</a>
        </div>
      </footer>
    </div>
  );
}


// Sub-componente para la Tarjeta con Carrusel
function TarjetaProducto({ producto, onOpenModal }) {
  const [imgIndex, setImgIndex] = useState(0);

  const nextImg = (e) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev + 1) % producto.imagenes.length);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev - 1 + producto.imagenes.length) % producto.imagenes.length);
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border-2 border-transparent hover:border-regalo-azul-c transition-all shadow-lg">
      {/* Carrusel */}
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img src={producto.imagenes[imgIndex]} alt={producto.nombre} className="w-full h-full object-cover transition-opacity duration-500" />
        
        {producto.imagenes.length > 1 && (
          <>
            <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white text-regalo-azul-r">❮</button>
            <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white text-regalo-azul-r">❯</button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {producto.imagenes.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === imgIndex ? 'bg-regalo-rosa' : 'bg-white/50'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-6 text-center">
        <h3 className="text-xl font-bold mb-2">{producto.nombre}</h3>
        <p className="text-2xl font-black text-regalo-verde mb-4">${producto.precio}</p>
        <button 
        onClick={onOpenModal}
        className="bg-regalo-verde hover:bg-regalo-rosa text-white w-full py-3 rounded-xl font-bold transition-colors"
        >
        Ver Detalle
      </button>
      </div>
    </div>
  );
}