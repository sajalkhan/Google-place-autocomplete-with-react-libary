import React, { useState } from 'react'
import GoogleMap from './component/GoogleMap'

const App = () => {

  const [state, setMapState] = useState({
    location: '',
    streetNumber: '',
    street: '',
    city: '',
    stateCode: [],
    zipCode: '',
    county: '',
  });

  const updateMapInfo = (data) => {
    setMapState({
      location: data.location,
      streetNumber: data.streetNumber,
      street: data.street,
      city: data.city,
      stateCode: data.stateCode,
      zipCode: data.zipCode
    });
  }

  return (
    <div style={{ width: '500px', margin: '100px auto' }}>

      <GoogleMap updateMapInfo={updateMapInfo} />

      <b>location: </b> {state.location} <br />
      <b>Street Number: </b> {state.streetNumber} <br />
      <b>street: </b> {state.street} <br />
      <b>city: </b> {state.city} <br />
      <b>stateCode: </b> {state.stateCode[0]?.label} <br />
      <b>zipCode: </b> {state.zipCode} <br />

    </div>
  )
}

export default App;