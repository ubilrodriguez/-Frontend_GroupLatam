
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="container mx-auto flex space-x-4">
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
        >
          Productos
        </Link>
        <Link 
          href="/create" 
          className="btn-new bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Nuevo Producto
        </Link>
      </div>
    </nav>
  );
}