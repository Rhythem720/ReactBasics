import React,{useId} from 'react'

function Select({
    options,
    label,
    className='',
    ...props
},ref) {
    const id= useId();
  return (
    <div className='w-full'>
        {label && 
        <label htmlFor={id}
         className='px-2 py-2 ng-gray-200 block mb-1'>      
            </label>}
        <select 
        {...props}
        id={id}
         className={`px-3 py-2 rounded-lg bg-white
         text-black outline-none focus:bg-gray-50
         duration-200 border border-gray-200 w-full ${className}`}>
            {/* if options doesn't have value then it will crash so that's why 
            we will optionally loop  */}
           {options?.map((option)=>(
            <option key={option} value={option}>
                {option}
            </option>
           ))}
         </select>
        
    </div>
  )
}

export default React.forwardRef(Select)