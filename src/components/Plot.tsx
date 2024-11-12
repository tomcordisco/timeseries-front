import React from 'react';
import { Line } from 'react-chartjs-2';

// Importa componentes específicos de chart.js para configurar el grafico.
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registra los elementos necesarios de Chart.js, permitiendo que react-chartjs-2 los utilice en el grafico
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define la interfaz PlotProps que indica los tipos de propiedades que el componente espera recibir
interface PlotProps {
  assetName: string; // Nombre del activo
  data: number[]; // Precios del activo
  labels: string[]; // Marcas de tiempo correspondientes a cada precio
}

// Define el componente Plot que recibe el nombre del activo, los precios y las etiquetas de tiempo
const Plot: React.FC<PlotProps> = ({ assetName, data, labels }) => {
  // Define los datos para el grafico utilizando el nombre del activo como etiqueta del conjunto de datos
  const chartData = {
    labels, // Etiquetas de tiempo en el eje x
    datasets: [
      {
        label: `${assetName} Last Prices`, // Titulo de la serie de datos
        data, // Datos de precios
        fill: false, // No rellena el area bajo la línea
        borderColor: 'greenyellow', // Color de la linea del grafico
        tension: 0.1, // Suaviza la linea del grafico
      },
    ],
  };

  return (
    <div style={{ width: '400px', margin: '20px' }}>
      <h3>{assetName} Price History</h3>
      <Line data={chartData} /> {/* Renderiza el grafico de linea con los datos proporcionados */}
    </div>
  );
};

export default Plot;