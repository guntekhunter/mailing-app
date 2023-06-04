import React from 'react'
import Text from '../Text/TextColor'

export default function TableBody({ item, className, children }) {
  return (
    <td className={`${className} px-10`}><Text item={item} color="lightDark"/>{children}</td>
  )
}
