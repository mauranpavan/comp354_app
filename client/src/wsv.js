import React from 'react'
import { useWSV } from './wsv.hooks';

const WSV = () => {

  const { backendData } = useWSV();
  
  return (
    <div>
      <h1>Charts</h1>
      {backendData && backendData.users.map((user, index) => (<span key={index}>{user}</span>))}
    </div>
  )
}

export default WSV;
