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
import {SynchroConfig} from "../config/SynchroConfig.ts";
import moment from 'moment';
import {Client} from "../service/Client.ts";

export default function BarChartDemo() {
    const [advertised, setAdvertised] = useState([0]);
    const [calculated, setCalculated] = useState([0]);
    const [usernames, setUsernames] = useState([""]);

    function handleData(data: { values: []; }) {
        let values = data["values"].filter((value) => (value["calculatedValue"] != 0.0));
        setUsernames(values.map((value) => value["username"]))
        setAdvertised(values.map((value) => value["advertisedValue"]))
        setCalculated(values.map((value) => value["calculatedValue"]))
    }

    async function fetchData() {
        const date = moment().format('YYYY-MM-DD'); // Customize format as needed
            return await Client.getJson(SynchroConfig.apiUrl + "admin/query-summary?month=" + date.toString());
    }

    ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);
    useEffect(() => {
        fetchData().then((result) => {
            handleData(result);
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