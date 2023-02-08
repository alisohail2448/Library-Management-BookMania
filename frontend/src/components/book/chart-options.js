import * as dayjs from "dayjs"

export const makeChartOptions = (chartData) => {
    const options = {
        chart: {
            type: "line",
        },
        title: {
            text: null,
        },
        xAxis: {
            categories: chartData?.map((item) => dayjs(item.modifiedAt)),
        },
        yAxis: {
            labels: {
                // eslint-disable-next-line no-template-curly-in-string
                format: "${value}",
            },
            title: {
                text: "Price",
            },
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                },
            },
        },
        series: [
            {
                showInLegend: false,
                name:  "Price",
                data: chartData?.map((item) => (Number(item.price))),
                // eslint-disable-next-line no-template-curly-in-string
                format: "${value}",
            },
        ],
    }

    return options
}
