import React from 'react'

export default function TableHead({item, className}) {
  return (
    <th className={className} scope="col">{item}</th>
  )
}
