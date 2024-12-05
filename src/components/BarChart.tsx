// BarChartDemo.js
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const generateRandomData = () => Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));

export default function BarChartDemo(){
    const data = {
        labels: Array.from({ length: 50 }, (_, i) => `Value ${i + 1}`),
        datasets: [
            {
                label: 'Random Values',
                data: generateRandomData(),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
    };

    return <Bar data={data} options={options} />;
};