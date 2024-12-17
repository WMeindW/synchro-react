import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {useEffect, useState} from "react";

export default function BarChartDemo() {
    const [advertised, setAdvertised] = useState([0]);
    const [calculated, setCalculated] = useState([0]);
    const [usernames, setUsernames] = useState([""]);


    async function fetchData() {
        return {
            advertised: [12, 19, 3, 5, 2, 3, 10],
            calculated: [2, 5, 2, 3, 1, 2, 7],
            usernames: ["John Doe", "Jane Doe", "Alice Doe", "Bob Doe", "Charlie Doe", "David Doe", "Emily Doe"],
        }
    }

    ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);
    useEffect(() => {
        fetchData().then((result) => {
            setAdvertised(result["advertised"]);
            setCalculated(result["calculated"]);
            setUsernames(result["usernames"]);
        })
    }, []);
    const data = {
        labels: usernames,
        datasets: [
            {
                label: 'Attended hours',
                data: advertised,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Calculated hours',
                data: calculated,
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
    return <Bar data={data} options={options}/>;
};