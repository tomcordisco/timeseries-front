import React from 'react';
import './Book.css';

// Define la interfaz `BookProps` que establece los tipos de las propiedades que el componente necesita.
interface BookProps {
  assetName: string; // Nombre del activo
  bid: number; // Precio de oferta
  last: number; // Último precio
  ask: number; // Precio de demanda
  timestamp: string; // Marca de tiempo del último precio
}

// Define el componente `Book`, que muestra el nombre del activo y sus precios en un cuadro.
const Book: React.FC<BookProps> = ({ assetName, bid, last, ask, timestamp }) => {
  console.log("Rendering Book component with:", { assetName, bid, last, ask, timestamp });

  return (
    <div className='book'>
      <h3>
        {assetName} <span style={{ fontSize: '0.8em' }}>{timestamp}</span>
      </h3>
      <div>
        <strong>Bid:</strong> {bid}  
      </div>
      <div>
        <strong>Last:</strong> {last}
      </div>
      <div>
        <strong>Ask:</strong> {ask}
      </div>
    </div>
  );
};

// Exporta el componente para su uso en otros archivos.
export default Book;
