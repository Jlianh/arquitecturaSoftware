import { Link } from 'react-router-dom';
import { useGetHousesQuery, useDeleteHouseMutation } from '../features/houseSlice';

import Swal from 'sweetalert2'

export default function HouseList() {

  const { data, isError, isLoading } = useGetHousesQuery();

  const [deleteHouse] = useDeleteHouseMutation()

  const handleDeleteHouse = (id) => {
    if (id) {
      Swal.fire({
        title: "Estas seguro?",
        text: "No vas a recuperar esta casa",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Eliminado",
            text: "La casa fue eliminada con exito",
            icon: "success"
          });
          deleteHouse(id)
        }
      });
    }
  }

  if (isLoading) return <div role="status" className='flex justify-center'>
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>;

  return (
    <div className="flex justify-center">
      <table className="border-separate border-spacing-2 border border-slate-500 w-11/12 align-self: center">
        <thead>
          <tr>
            <th className="border border-slate-600">Code</th>
            <th className="border border-slate-600">Address</th>
            <th className="border border-slate-600">City</th>
            <th className="border border-slate-600">State</th>
            <th className="border border-slate-600">Size</th>
            <th className="border border-slate-600">Type</th>
            <th className="border border-slate-600">Zip Code</th>
            <th className="border border-slate-600">Rooms</th>
            <th className="border border-slate-600">Bathrooms</th>
            <th className="border border-slate-600">Parking</th>
            <th className="border border-slate-600">Price</th>
            <th className="border border-slate-600">Image</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((house) => (
            <tr key={house._id}>
              <td className="border border-slate-700" key={house.code}>{house.code}</td>
              <td className="border border-slate-700" key={house.address}>{house.address}</td>
              <td className="border border-slate-700" key={house.city}>{house.city}</td>
              <td className="border border-slate-700" key={house.state}>{house.state}</td>
              <td className="border border-slate-700" key={house.size}>{house.size}</td>
              <td className="border border-slate-700" key={house.type}>{house.type}</td>
              <td className="border border-slate-700" key={house.zipCode}>{house.zipCode}</td>
              <td className="border border-slate-700" key={house.rooms}>{house.rooms}</td>
              <td className="border border-slate-700" key={house.bathrooms}>{house.bathrooms}</td>
              <td className="border border-slate-700" key={house.parking}>{house.parking}</td>
              <td className="border border-slate-700" key={house.price}>{house.price}</td>
              <td className="border-y-2 px-4 py-2 border-indigo-600">
                <img className="size-40 transition-transform duration-1000 transform hover:scale-110 max-w-none"
                  src={`http://localhost:3000/${house.photo}`} /></td>
              <td className="border border-slate-700">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <Link to={`/user/${house._id}`}
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border
                  border-gray-900 rounded-s-lg hover:bg-slate-400 hover:text-black
                  focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white
                                             dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">Edit</Link>
                  <button type="button" onClick={() => handleDeleteHouse(house._id)} className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >

  )
}