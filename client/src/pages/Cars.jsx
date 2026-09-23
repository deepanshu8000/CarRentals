import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const Cars = () => {

  // Getting search params from URL
  const [searchParams] = useSearchParams()

  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const { cars, axios } = useAppContext()

  const [input, setInput] = useState('')
  const [filteredCars, setFilteredCars] = useState([])

  const isSearchData = pickupLocation && pickupDate && returnDate

  // Apply search filter
  const applyFilter = () => {

    if (input === '') {
      setFilteredCars(cars)
      return
    }

    const filtered = cars.filter((car) => {
      return (
        car.brand?.toLowerCase().includes(input.toLowerCase()) ||
        car.model?.toLowerCase().includes(input.toLowerCase()) ||
        car.category?.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission?.toLowerCase().includes(input.toLowerCase())
      )
    })

    setFilteredCars(filtered)
  }

  // Search car availability
  const searchCarAvailability = async () => {
    try {
      const { data } = await axios.post(
        '/api/bookings/check-availaibility',
        {
          location: pickupLocation,
          pickupDate,
          returnDate
        }
      )

      if (data.success) {
        setFilteredCars(data.availableCars)

        if (data.availableCars.length === 0) {
          toast('No Cars Available')
        }
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  // When search data is available
  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability()
    }
  }, [pickupLocation, pickupDate, returnDate])

  // When cars or search input changes
  useEffect(() => {
    if (!isSearchData) {
      applyFilter()
    }
  }, [cars, input])

  return (
    <div>

      {/* Header / Search Section */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='flex flex-col items-center py-20 bg-light max-md:px-4'
      >

        <Title
          title='Available Cars'
          subTitle='Browse our collection of premium vehicles available for our next adventure'
        />

        {/* Search Box */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'
        >

          <img
            src={assets.search_icon}
            alt="search_icon"
            className='w-4.5 h-4.5 mr-2'
          />

          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder='Search by model or features'
            className='w-full h-full outline-none text-gray-500'
          />

          <img
            src={assets.filter_icon}
            alt="filter_icon"
            className='w-4.5 h-4.5 ml-2'
          />

        </motion.div>

      </motion.div>

      {/* Cars Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'
      >

        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>
          Showing {filteredCars.length} Cars
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>

          {filteredCars.map((car, index) => (

            <motion.div
              key={car._id || index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.1 * index
              }}
            >
              <CarCard car={car} />
            </motion.div>

          ))}

        </div>

      </motion.div>

    </div>
  )
}

export default Cars