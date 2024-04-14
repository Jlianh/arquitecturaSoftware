import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import LoansForm from './LoansForm';
import { useCreateLoanMutation } from '../../features/api/loanSlice';
import { useGetStudentsQuery } from '../../features/api/studentSlice';
import { useGetBooksQuery } from '../../features/api/bookSlice';

export default function LoansFormCreate() {

    const navigate = useNavigate(); // Instanciamos la vaiable de useNavigate
    const [createLoan] = useCreateLoanMutation()
    const { data: students } = useGetStudentsQuery();
    const { data: books } = useGetBooksQuery();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newLoan = {
            date: e.target.name.value,
            student_id: e.target.student_id.value,
            book_id: e.target.book_id.value,
        }
        try {
            const response = await createLoan(newLoan)
            if (response.data.status == "error") {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "El prestamo no pudo ser registrado, por favor verifique los datos",
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Prestamo Creado Correctamente",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/loans') // Hacemos la redireccion
                });
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <LoansForm props={{
            handleSubmit: handleSubmit,
            loan: null,
            students: students,
            books: books
        }} />
    );
}