import { useState } from 'react';
import './App.scss';

import Card from './components/Card.jsx';
import { Fetch } from './helpers/fetch';

function App() {

  //Hook To set the card data
  const [data, setdata] = useState([])

  //Hook to handle usersearch
  const [search, setsearch] = useState('')

  //handle User input
  const handleInput = (e) => {
    setsearch(e.target.value)
  }

  //Handle search button
  const handleSearch = async (e) => {
    let response = await Fetch(`${search}`)
    let data = await response.json()
    setdata(data.next_days)
  }

  //Handle current position
  const handleCurrentPosition = async (e) => {

    navigator.geolocation.getCurrentPosition(async (position) => {
      let response = await Fetch(`${position.coords.latitude},${position.coords.longitude}`)
      let data = await response.json()
      setdata(data.next_days)
    });

  }



  return (
    <div className="container">
      <div className="text-center">
        <h1>
          Consume Weather API
        </h1>
      </div>
      <input type="text" className='city-input custom-font-style' placeholder='Ingrese Ciudad' onChange={handleInput} />
      <button className='custom-buttons custom-font-style' onClick={handleCurrentPosition}>Usar mi Unicación</button>
      <button className='custom-buttons custom-font-style' onClick={handleSearch}>Buscar</button>
      {data.length > 0
        ?
        <div className="cards-section">

          <Card data={data} />

        </div>
        : <div className='text-center'>
          <h2>
          Busca la informacion del clima de una ciudad o de tu posicion actual
          </h2>
        </div>
      }



    </div>
  );
}

export default App;
