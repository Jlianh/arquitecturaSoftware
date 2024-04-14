/** Componente reutilizable para Crear y Actualizar un Usuario */
export default function LoansForm({ props }) {
    const { handleSubmit, loan, students, books } = props

    return (
        <div className="max-w-md w-full mx-auto px-5 py-5 h-screen">
            <form onSubmit={handleSubmit} className="shadow-md rounded pt-6 pb-10 mb-4 px-10 mt-3">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Name</label>
                    <input type="date" required name="date" placeholder="Fecha de prestamo" defaultValue={loan?.date}
                        className="shadow appearance-none border-gray-400 rounded-lg p-2 w-full focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label for="underline_select" class="sr-only">Underline select</label>
                    <select id="underline_select"  class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2
                     border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0
                      focus:border-gray-200 peer" defaultValue={loan?.book_id}>
                        <option selected>Selecciona el libro</option>
                        {
                            books.map(book=>(
                                <option value={book.id}>{book.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="mb-4">
                    <label for="underline_select" class="sr-only">Underline select</label>
                    <select id="underline_select" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2
                     border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0
                      focus:border-gray-200 peer" defaultValue={loan?.student_id}>
                        <option selected>Selecciona el estudiante</option>
                        {
                            students.map(student=>(
                                <option value={student.id}>{student.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 rounded text-blue-50 font-bold py-2 px-4">Save</button>
                </div>
            </form>
        </div>
    );
}