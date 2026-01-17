
import { Pie } from 'react-chartjs-2';
import {
    Chart as  ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryChartProps {
    categorySummary: Record<string, number>;

}

function CategoryChart({ categorySummary }: CategoryChartProps) {
    if (Object.keys(categorySummary).length === 0) {
        return null;
    }

    const data = {
        labels: Object.keys(categorySummary),
        datasets: [
         {
            data: Object.values(categorySummary),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
            ],
         },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const label = context.label || '';
                        const value = context.raw as number;
                        return `${label}: $${value.toFixed(2)}`;
                    },
                },
            },
        },
    };
    return (
        <div style={{ marginTop: '32px', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto'}}>
            <h3 > Spending by Category</h3>
            <Pie data={data} options={options} />
        </div>
    );
}

export default CategoryChart;
