import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ChartData {
    series: {
        data: number[];
    }[];
    options: ApexOptions;
}

interface StatisticItem {
    name: ChartData;
    title: string;
    count: string;
    bg: string;
}

const baseOptions: ApexOptions = {
    chart: {
        toolbar: {
            show: false,
        },
        offsetX: 0,
        offsetY: 0,
        zoom: { enabled: false },
        sparkline: { enabled: true },
        animations: { enabled: true },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    tooltip: { enabled: false },
    grid: {
        show: false,
        padding: { left: 0, right: 0, top: 0, bottom: 0 },
    },
    yaxis: {
        show: false,
        min: 0,
        max: 1200,
    },
    fill: { type: "solid", opacity: 0.1 },
    legend: { show: false },
    xaxis: {
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
    },
};


const shapeLine1: ChartData = {
    series: [{ data: [800, 600, 1000, 800, 600, 1000, 800, 900] }],
    options: {
        ...baseOptions,
        colors: ["#00EBFF"],
    },
};

const shapeLine2: ChartData = {
    series: [{ data: [800, 600, 1000, 800, 600, 1000, 800, 900] }],
    options: {
        ...baseOptions,
        colors: ["#FB8F65"],
    },
};

const shapeLine3: ChartData = {
    series: [{ data: [800, 600, 1000, 800, 600, 1000, 800, 900] }],
    options: {
        ...baseOptions,
        colors: ["#5743BE"],
    },
};

const statistics: StatisticItem[] = [
    {
        name: shapeLine1,
        title: "Present Students",
        count: "564",
        bg: "#E5F9FF",
    },
    {
        name: shapeLine2,
        title: "Absent Students",
        count: "54",
        bg: "#FFEDE5",
    },
    {
        name: shapeLine3,
        title: "Total Students",
        count: "624",
        bg: "#EAE5FF",
    },
];


const GroupChart1: React.FC = () => {
    return (
        <>
            {statistics.map((item, i) => (
                <div className="col-12 col-md-4 border-0" key={i}>
                    <div className="py-3 px-4 rounded-2" style={{ backgroundColor: item.bg }}>
                        <div className="d-flex align-items-center gap-3">
                            <div className="flex-shrink-0">
                                <Chart
                                    options={item.name.options}
                                    series={item.name.series}
                                    type="area"
                                    height={60}
                                    width={60}
                                />
                            </div>
                            <div className="flex-grow-1">
                                <div className="text-dark fw-medium mb-1 small pt-2">{item.title}</div>
                                <div className="fs-5 fw-semibold text-dark">{item.count}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};


export default GroupChart1;
