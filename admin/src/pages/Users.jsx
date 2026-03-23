import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Users = ({ token, backendUrl }) => {

  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/user/list', { headers: { token } })
      if (response.data.success) {
        setUsers(response.data.users)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [token])

  return (
    <div>
      <p className='mb-2 text-xl font-medium'>Customer Base</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_2fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Name</b>
          <b>Email</b>
          <b>Phone</b>
          <b>Address</b>
        </div>

        {
          users.map((item, index) => (
            <div className='grid grid-cols-[1fr_2fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.phoneNumber || 'N/A'}</p>
              <p className='hidden md:block'>{item.address?.city || 'N/A'}, {item.address?.country || 'N/A'}</p>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default Users
