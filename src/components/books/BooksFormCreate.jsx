import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import BooksForm from './BooksForm';
import { useCreateBookMutation } from '../../features/api/bookSlice';

export default function BooksFormCreate() {

    const navigate = useNavigate(); // Instanciamos la vaiable de useNavigate
    const [createBook] = useCreateBookMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBook = {
            name: e.target.name.value,
            isbn: e.target.isbn.value,
            color: e.target.color.value,
        }
        try {
            const response = await createBook(newBook)
            if (response.data.status == "error") {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "El libro no pudo ser registrado, por favor verifique los datos",
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Libro Creado Correctamente",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/books') // Hacemos la redireccion
                });
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <BooksForm props={{
            handleSubmit: handleSubmit,
            book: null
        }} />
    );
}