import React from 'react'

const carcards = ({car}) => {
  const currency=import.meta.env.VITE_CURRENCY;
  return (
    <div className='group rounded-xl overflow-hidden shadow-lg 
     hover:-translate-y-l transition-all duration-500 cursor-pointer'>
     <div className='relative h-48 overflow-hidden'>
         <img src={car.image} alt='Car Image' className='w-full h-full object-cover transition-transform duration-500 
         group-hover:scale-105'/>
         {car.isAvailable && <p className='absolute top-4 left-4 bg-primary/90
          text-white text-xs px-2.5 py-1 rounded-full'>Available Now</p>}
          <div className='absolute bottom-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg'>
             <span className='font-semibold'>{currency}{car.pricePerDay}</span> 
             <span className='text-sm text white/80'>/ day</span>   
          </div>
     </div>
     <div className='p-4 sm:p-5'>
         <div className='flex justify-between items-start mb-2'>
           <div>
             <h3>{car.brand}</h3> 
           </div>
         </div>
      </div>
    </div>
  )
}

export default carcards