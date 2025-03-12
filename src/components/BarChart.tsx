import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend, ChartOptions,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {useEffect, useState} from "react";
import {SynchroConfig} from "../config/SynchroConfig.ts";
import moment from 'moment';
import {Client} from "../service/Client.ts";

export default function BarChart() {
    const [advertised, setAdvertised] = useState([0]);
    const [calculated, setCalculated] = useState([0]);
    const [usernames, setUsernames] = useState([""]);
    const [barTime, setBarTime] = useState(moment(new Date()).format("YYYY-MM"));
    const pageSize = 10;
    const [pageNumber, setPageNumber] = useState(1);
    const [labelSize, setLabelSize] = useState(0);


    function handleData(data: { values: []; }) {
        let values = data["values"].filter((value) => (value["calculatedValue"] != 0.0));
        setLabelSize(values.length);
        values = values.slice((pageNumber - 1) * pageSize, ((pageNumber - 1) * pageSize) + pageSize);
        setUsernames(values.map((value) => value["username"]))
        setAdvertised(values.map((value) => value["advertisedValue"]))
        setCalculated(values.map((value) => value["calculatedValue"]))
    }

    async function fetchData() {
        return await Client.getJson(SynchroConfig.apiUrl + "admin/query-summary?month=" + barTime + "-01");
    }

    ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

    useEffect(() => {
        fetchData().then((result) => {
            if (result != null)
                handleData(result);
        })
    }, [barTime, pageNumber]);

    const data = {
        labels: usernames,
        datasets: [
            {
                label: 'Attended hours',
                data: advertised,
                backgroundColor: '#D8C4B6',
                borderColor: '#3E5879'
            },
            {
                label: 'Calculated hours',
                data: calculated,
                backgroundColor: '#3E5879',
                borderColor: '#3E5879'
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    color: '#D8C4B6',
                },
            },
            y: {
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#3E5879'
                },
            },
            datalabels: {
                color: '#3E5879',
                anchor: 'end',
                align: 'top',
                font: {
                    size: 10,
                },
                formatter: (value: any) => value,
            },
        },
    };

    return (<div className={"container-form"}>
        <input type={"month"} value={moment(barTime).format("YYYY-MM")}
               onChange={(event) => {
                   setBarTime(moment(event.target.value).format("YYYY-MM"))
               }}/>
        <button onClick={() => {
            if (pageNumber <= 1)
                setPageNumber(1)
            else {
                console.log("previous page")
                setPageNumber(pageNumber - 1)
            }
            console.log(pageNumber)
        }}>{"<"}
        </button>
        <button onClick={() => {
            console.log(labelSize)
            if (pageNumber <= Math.round(labelSize / pageSize)) {
                console.log("next page")
                setPageNumber(pageNumber + 1)
            }
            console.log(pageNumber)
        }}>{">"}
        </button>
        {pageNumber}/{Math.round(labelSize / pageSize) + 1}
        <Bar className={"timeline-form"} data={data} options={options}/>
    </div>);
};