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
      <p className='mb-4 text-xl font-medium'>Customer Base</p>
      <div className='flex flex-col gap-3'>
        {/* Header - Hidden on mobile */}
        <div className='hidden md:grid grid-cols-[1fr_2fr_1fr_1.5fr] items-center py-2 px-4 border bg-gray-100 text-sm font-semibold rounded-t'>
          <p>Name</p>
          <p>Email</p>
          <p>Phone</p>
          <p>Address</p>
        </div>

        {/* User List */}
        {
          users.map((item, index) => (
            <div 
              className='grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_1.5fr] items-center gap-2 md:gap-4 py-3 px-4 border text-sm bg-white md:bg-transparent rounded-lg md:rounded-none shadow-sm md:shadow-none' 
              key={index}
            >
              {/* Name */}
              <div className='flex md:block items-center gap-2'>
                <span className='md:hidden font-bold w-20 text-gray-500'>Name:</span>
                <p className='font-medium md:font-normal'>{item.name}</p>
              </div>

              {/* Email */}
              <div className='flex md:block items-center gap-2 overflow-hidden'>
                <span className='md:hidden font-bold w-20 text-gray-500'>Email:</span>
                <p className='truncate'>{item.email}</p>
              </div>

              {/* Phone */}
              <div className='flex md:block items-center gap-2'>
                <span className='md:hidden font-bold w-20 text-gray-500'>Phone:</span>
                <p>{item.phoneNumber || 'N/A'}</p>
              </div>

              {/* Address */}
              <div className='flex md:block items-center gap-2'>
                <span className='md:hidden font-bold w-20 text-gray-500'>Address:</span>
                <p className='text-gray-600 md:text-inherit'>
                  {item.address ? `${item.address.city || ''}${item.address.city && item.address.country ? ', ' : ''}${item.address.country || ''}` : 'N/A'}
                </p>
              </div>
            </div>
          ))
        }

        {users.length === 0 && (
          <p className='text-center py-10 text-gray-500'>No customers found.</p>
        )}
      </div>
    </div>
  )
}

export default Users
