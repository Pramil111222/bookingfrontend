import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

const getRandomColor = () => {
    const r = Math.floor(Math.random() * 100) + 100;
    const g = Math.floor(Math.random() * 100) + 100;
    const b = Math.floor(Math.random() * 100) + 100;
    return `rgba(${r}, ${g}, ${b}, 0.8)`;
};

function SecTwo({ monthlyData }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (monthlyData && monthlyData.length > 0 && chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');

            // Sort data by year and month
            const sortedData = [...monthlyData].sort((a, b) => {
                return new Date(a.year, getMonthIndex(a.month)) - new Date(b.year, getMonthIndex(b.month));
            });

            const labels = sortedData.map(item => `${item.month} ${item.year}`);

            const colors = {
                bookings: getRandomColor(),
                profit: getRandomColor(),
                revenue: getRandomColor(),
            };

            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Bookings',
                            data: sortedData.map(item => item.bookings),
                            borderColor: colors.bookings,
                            backgroundColor: colors.bookings,
                            fill: false,
                            tension: 0.3,
                        },
                        {
                            label: 'Profit',
                            data: sortedData.map(item => item.profit),
                            borderColor: colors.profit,
                            backgroundColor: colors.profit,
                            fill: false,
                            tension: 0.3,
                        },
                        {
                            label: 'Revenue',
                            data: sortedData.map(item => item.revenue),
                            borderColor: colors.revenue,
                            backgroundColor: colors.revenue,
                            fill: false,
                            tension: 0.3,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Amount' },
                        },
                        x: {
                            title: { display: true, text: 'Month' },
                        },
                    },
                },
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [monthlyData]);

    const getMonthIndex = (monthName) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months.indexOf(monthName);
    };

    return (
        <div className="card h-100 me-3">
            <div className="card-header">Monthly Bookings, Profit, and Revenue</div>
            <div className="card-body" style={{ height: '300px' }}>
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    )
}

export default SecTwo