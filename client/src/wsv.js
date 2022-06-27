import React, { useEffect, useState } from 'react'

const WSVApp = () => {

  const [backendData, setBackendData] = useState();

  useEffect(() => {
    fetch("/api").then(response => response.json()).then(data => setBackendData(data))
  }, []);

  
  return (
    <div>
      <h1>Charts</h1>
      {backendData && backendData.users.map((user, index) => (<span key={index}>{user}</span>))}
    </div>
  )
}

export default WSVApp;
