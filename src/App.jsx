import { useState } from 'react';
import './App.scss';

import Card from './components/Card.jsx';
import { Fetch } from './helpers/fetch';

function App() {

  //Hook To set the card data
  const [data, setdata] = useState([]);

  //Hook To set the region
  const [region, setregion] = useState('');

  //Hook to handle usersearch
  const [search, setsearch] = useState('');

  //Hook To set the card data
  const [loadstate, setloadstate] = useState(false);

  //handle User input
  const handleInput = (e) => {
    setsearch(e.target.value);
  }

  //Handle search button
  const handleSearch = async (e) => {
    setloadstate(true);
    try {
        if(search.length> 0){
          let response = await Fetch(`${search}`);
          let data = await response.json();
          setregion(data.region)
          setdata(data.next_days);
          setloadstate(false);
        }else{
          setdata([]);
          setloadstate(false);
        }
        
    } catch (error) {
        setloadstate(false);
        console.log("Ocurrio un error al obtener la data", error);
    }

  }

  //Handle current position
  const handleCurrentPosition = async (e) => {

    navigator.geolocation.getCurrentPosition(async (position) => {
      setloadstate(true);
      try {
        let response = await Fetch(`${position.coords.latitude},${position.coords.longitude}`);
        let data = await response.json();
        setregion(data.region)
        setdata(data.next_days);
        setloadstate(false);
      } catch (error) {
        console.log("Ocurrionun error al obtener la data", error);
        setloadstate(false);
      }
      
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
      <button className='custom-buttons custom-font-style' onClick={handleCurrentPosition}>Usar mi Ubicación</button>
      <button className='custom-buttons custom-font-style' onClick={handleSearch}>Buscar</button>
      <br />
      <span className='text-center'>Region Actual : {region}</span>
      {data.length > 0
        ?
        <div className="cards-section">

          <Card data={data} />

        </div>
        : <div className='text-center'>
          <h2>
            Selecciona una opcion busca la información del clima de una ciudad o de tu posicion actual
          </h2>
        </div>
      }

      {
        loadstate && 
        <div className='container-center'>
        <div className="lds-dual-ring"></div>
        </div>
      }



    </div>
  );
}

export default App;
