import { Link } from "react-router-dom";

export default function Header() {

  return (
    <nav className="bg-gray-800 text-white py-4 flex justify-between items-center">
      <ul className="flex px-8 space-x-5">
        <li>
          <Link to="/student" className="hover:text-blue-500">
            Estudiantes
          </Link>
        </li>
        <li>
          <Link to="/create-student" className="hover:text-blue-500">
            Crear Estudiante
          </Link>
        </li>
        <li>
          <Link to="/books" className="hover:text-blue-500">
            Libros
          </Link>
        </li>
        <li>
          <Link to="/create-book" className="hover:text-blue-500">
            Crear Libro
          </Link>
        </li>
        <li>
          <Link to="/loans" className="hover:text-blue-500">
            Prestamos
          </Link>
        </li>
        <li>
          <Link to="/create-loan" className="hover:text-blue-500">
            Crear Prestamos
          </Link>
        </li>

      </ul>

    </nav>
  );
}
