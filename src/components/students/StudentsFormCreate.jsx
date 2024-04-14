import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import StudentsForm from './StudentsForm';
import { useCreateStudentMutation } from '../../features/api/studentSlice';

export default function StudentsFormCreate() {

    const navigate = useNavigate(); // Instanciamos la vaiable de useNavigate
    const [createStudent] = useCreateStudentMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            name: e.target.name.value,
            email: e.target.email.value,
            dni: e.target.dni.value,
        }
        try {
            const response = await createStudent(newUser)
            if (response.data.status == "error") {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "El estudiante no pudo ser registrado, por favor verifique los datos",
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Estudiante Creado Correctamente",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/students') // Hacemos la redireccion
                });
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <StudentsForm props={{
            handleSubmit: handleSubmit,
            user: null
        }} />
    );
}