// BarChartDemo.js
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

const generateRandomData = () => Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));

const BarChartDemo = () => {
    const data = {
        labels: Array.from({ length: 50 }, (_, i) => `Value ${i + 1}`),
        datasets: [
            {
                label: 'Dataset 1',
                data: generateRandomData(),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: generateRandomData(),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
            datalabels: {
                color: 'black',
                anchor: 'end',
                align: 'top',
                font: {
                    size: 10,
                },
                formatter: (value: any) => value, // Show exact values
            },
        },
    };

    // @ts-ignore
    return <Bar data={data} options={options} />;
};

export default BarChartDemo;
