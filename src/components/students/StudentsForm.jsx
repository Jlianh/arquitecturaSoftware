/** Componente reutilizable para Crear y Actualizar un Usuario */
export default function StudentsForm({props}){
    const { handleSubmit, student } = props

    return (
        <div className="max-w-md w-full mx-auto px-5 py-5 h-screen">
            <form onSubmit={handleSubmit} className="shadow-md rounded pt-6 pb-10 mb-4 px-10 mt-3">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Name</label>
                    <input type="text" required name="name" placeholder="Name" defaultValue={student?.name}
                            className="shadow appearance-none border-gray-400 rounded-lg p-2 w-full focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Email</label>
                    <input type="email" required name="email" placeholder="Email" defaultValue={student?.email}
                    className="shadow appearance-none border-gray-400 rounded-lg p-2 w-full focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">DNI</label>
                    <input type="number" required name="dni" placeholder="DNI" defaultValue={student?.dni}
                        className="shadow appearance-none border-gray-400 rounded-lg p-2 w-full focus:shadow-outline" />
                </div>
                <div className="flex justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 rounded text-blue-50 font-bold py-2 px-4">Save</button>
                </div>
            </form>
        </div>
    );
}