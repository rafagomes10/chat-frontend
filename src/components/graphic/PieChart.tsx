import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PieChart: React.FC = () => {
    const options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Distribuição de mensangens por usuário'
        },
        series: [{
            name: 'Vendas',
            data: [
                { name: 'Juca', y: 40 },
                { name: 'João', y: 30 },
                { name: 'Maria', y: 20 },
                { name: 'usuario test', y: 10 }
            ]
        }],
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        }
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;
