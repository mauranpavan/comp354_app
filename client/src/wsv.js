import React from 'react'
import { useWSV } from './wsv.hooks';

const WSV = () => {

  const { backendData } = useWSV();
  
  return (
    <div>
      <h1>Charts</h1>
      {backendData && backendData.message}
    </div>
  )
}

export default WSV;
