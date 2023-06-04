import React from 'react';

export default function Footer({children, ...props}) {
  return (
    <div className='footer align-bottom p-4 text-[10px]'>
      <p className='text-center text-[#333333]'>{children}</p>
    </div>
  )
}
