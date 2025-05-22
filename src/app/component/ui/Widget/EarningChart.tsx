import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const useDarkMode = (): [boolean] => {
    return [false];
};

interface EarningChartProps {
    className?: string;
}

const EarningChart: React.FC<EarningChartProps> = ({
    className = "bg-white rounded p-3 px-4 col-md-6",
}) => {
    const [isDark] = useDarkMode();
    const series: number[] = [44, 55];
    const options: ApexOptions = {
        labels: ["Occupied", "Vacant"],
        dataLabels: {
            enabled: false,
        },
        colors: ["#0CE7FA", "#FA916B"],
        legend: {
            position: "bottom",
            fontSize: "14px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 400,
            markers: {
                size: 8,
                offsetY: 0,
                offsetX: -5,
            },
            itemMargin: {
                horizontal: 18,
                vertical: 0,
            },
            labels: {
                colors: isDark ? "#CBD5E1" : "#475569",
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "65%",
                },
            },
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    };

    return (
        <div className={className}>
            <div className="d-flex align-items-center justify-content-between">
                <div className="me-3">
                    <div className="text-muted small mb-1">Earnings</div>
                    <div className="h5 mb-1 text-dark">$12,335.00</div>
                    <div className="text-muted small">
                        <span className="text-success fw-semibold">+08%</span> From last week
                    </div>
                </div>
                <div className="flex-grow-1 text-end">
                    <Chart
                        type="donut"
                        height={200}
                        options={options}
                        series={series}
                    />
                </div>
            </div>
        </div>
    );
};

export default EarningChart;
