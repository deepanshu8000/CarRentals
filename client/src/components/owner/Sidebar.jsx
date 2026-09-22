import React, { useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Sidebar = () => {
  const {user,axios,fetchUser} = useAppContext();
  const location = useLocation()

  const [image, setImage] = useState('')

  const updateImage = async () => {
   try {
    const formData=new FormData()
    formData.append('image',image)
    const {data}=await axios.post('/api/owner/update-image', formData)
    if(data.success){
      fetchUser()
      toast.success(data.message)
      setImage('')
    }
    else{
      toast.error(data.message)
    }
   } catch (error) {
     toast.error(error.message)
   }
  }

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm">

      {/* Profile Image */}
      <div className="group relative">
        <label htmlFor="image">
          <img
            className="w-20 h-20 rounded-full object-cover cursor-pointer"
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://www.magnific.com/free-photos-vectors/user-profile"
            }
            alt="profile"
          />

          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="absolute inset-0 hidden bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="edit icon" />
          </div>
        </label>
      </div>

      {/* Save Button */}
      {image && (
        <button
          onClick={updateImage}
          className="absolute top-2 right-2 flex items-center gap-1 p-2 bg-primary/10 text-primary rounded cursor-pointer"
        >
          Save
          <img src={assets.check_icon} width={13} alt="check icon" />
        </button>
      )}

      {/* User Name */}
      <p className="mt-2 text-base max-md:hidden">
        {user?.name}
      </p>

      {/* Sidebar Links */}
      <div className="w-full mt-6">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-3 px-5 py-3 w-full ${
              link.path === location.pathname
                ? 'bg-primary/10 text-primary'
                : 'text-gray-600'
            }`}
          >
            <img
              src={
                link.path === location.pathname
                  ? link.coloredIcon
                  : link.icon
              }
              alt={link.name}
            />

            <span className="max-md:hidden">
              {link.name}
            </span>

            {link.path === location.pathname && (
              <div className="absolute right-0 w-1.5 h-8 rounded-l bg-primary"></div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default Sidebar  