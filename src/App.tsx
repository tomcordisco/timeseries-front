import React, { useState, useEffect } from 'react';
import socket from './socket';
import Book from './components/Book';
import Plot from './components/Plot';
import './App.css';

// Define la interfaz AssetData. Describe la estructura de los datos de activos recibidos desde el socket
interface AssetData {
  asset: string; // Nombre del activo
  bid: number; // Precio de oferta
  last: number; // Ultimo precio
  ask: number; // Precio de demanda
  timestamp: string; // Marca de tiempo del ultimo precio
}

// Componente principal `App`.
const App: React.FC = () => {
  const [assetData, setAssetData] = useState<AssetData[]>([]); // Estado para almacenar datos de activos
  const [lastPrices, setLastPrices] = useState<{ [key: string]: number[] }>({}); // Estado para ultimos precios de cada activo
  const [timestamps, setTimestamps] = useState<{ [key: string]: string[] }>({}); // Estado para marcas de tiempo de cada activo

  useEffect(() => {
    // Funcion que maneja la actualización de precios recibida desde el socket
    const handlePriceUpdate = (data: AssetData) => {
      console.log("Received data:", data);

      // Verifica que el formato de los datos sea correcto antes de actualizar los estados
      if (
        data &&
        typeof data.asset === 'string' &&
        typeof data.bid === 'number' &&
        typeof data.ask === 'number' &&
        typeof data.last === 'number' &&
        typeof data.timestamp === 'string'
      ) {
        // Actualiza el estado assetData, eliminando datos duplicados del mismo activo y agregando los nuevos
        setAssetData((prevData) => {
          const updatedData = prevData.filter((item) => item.asset !== data.asset);
          return [...updatedData, data];
        });

        // Actualiza el estado lastPrices limitando el historial a los ultimos 10 precios
        setLastPrices((prevPrices) => ({
          ...prevPrices,
          [data.asset]: [...(prevPrices[data.asset] || []), data.last].slice(-10),
        }));

        // Actualiza el estado timestamps limitando el historial a las ultimas 10 marcas de tiempo
        setTimestamps((prevTimestamps) => ({
          ...prevTimestamps,
          [data.asset]: [...(prevTimestamps[data.asset] || []), data.timestamp].slice(-10),
        }));
      } else {
        console.warn("Data format is incorrect:", data);
      }
    };

    // Escucha el evento priceUpdate desde el socket
    socket.on('priceUpdate', handlePriceUpdate);

    // Limpia el evento del socket cuando el componente se desmonta
    return () => {
      socket.off('priceUpdate', handlePriceUpdate);
    };
  }, []);

  return (
    <div className='App-header'>
      <h1 className='title'>Asset Visualizer</h1>
      
      <div className='book-container'>
        {assetData.length > 0 ? (
          assetData.map((asset: AssetData) => (
            <Book
              key={asset.asset}
              assetName={asset.asset}
              bid={asset.bid}
              last={asset.last}
              ask={asset.ask}
              timestamp={asset.timestamp}
            />
          ))
        ) : (
          <div>No data available</div> // Muestra un mensaje si no hay datos disponibles
        )}
      </div>

      <div className='book-container'>
        {Object.keys(lastPrices).map((asset) => (
          <Plot
            key={asset}
            assetName={asset}
            data={lastPrices[asset]}
            labels={timestamps[asset]}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
