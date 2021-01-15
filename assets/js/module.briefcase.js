// Data generator - для демострации работы. Можно удалить
function generateChartData() {
    let chartData = [];
    let firstDate = new Date();
    firstDate.setMinutes(firstDate.getDate() - 10);
    let payments = 10;
    for (let i = 0; i < 10; i++) {
        let newDate = new Date(firstDate);
        newDate.setMinutes(newDate.getMinutes() + i);
        payments = getRandomInt(10, 1000);
        chartData.push({
            date: newDate,
            payments: payments
        });
    }
    return chartData;
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
// endof

const briefcase = {
    createModule: (dist, textData, chartData) => {
        const briefcaseModule = document.createElement('div');
        const briefcaseChartHolder = document.createElement('div');
        const defaultLayout = `
            <div class="briefcase-overall">
                <div class="briefcase-overall__summ">${textData.title}</div>
                <a href="${textData.link}" class="briefcase-overall__link">Смотреть детали</a>
            </div>
            <div class="briefcase-income">
                ${textData.percentsAmount}
                <svg width="15" height="15" viewBox="0 0 15 15" fill="#589585" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 6L2.55 7.05L6.75 2.85L6.75 15L8.25 15L8.25 2.85L12.45 7.05L13.5 6L7.5 6.91406e-07L1.5 6Z"/>
                </svg>
            </div>
        `;
        briefcaseModule.setAttribute('class', 'briefcase def-module');
        briefcaseChartHolder.classList.add('briefcase-chart');
        briefcaseModule.insertAdjacentHTML('afterbegin', defaultLayout);
        briefcaseModule.insertAdjacentElement('beforeend', briefcaseChartHolder);
        briefcase.createGraph(briefcaseChartHolder, generateChartData());
        briefcase.insertModule(briefcaseModule, dist);
    },
    insertModule: (el, dist) => {
        const distInner = document.querySelector(dist);
        if (distInner) distInner.insertAdjacentElement('beforeend', el);
    },
    createGraph: (el, data) => {
        am4core.ready(function() {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Gradients
            let greenGradient = new am4core.LinearGradient();
            greenGradient.addColor(am4core.color("rgba(88, 149, 133, 0.49)"));
            greenGradient.addColor(am4core.color("rgba(88, 149, 133, 0)"));
            greenGradient.rotation = 90;

            // Create chart
            let brieftcaseChart = am4core.create(el, am4charts.XYChart);

            // Removing padding/margin and zoomBtn from chart
            brieftcaseChart.paddingRight = 0;
            brieftcaseChart.paddingLeft = 0;
            brieftcaseChart.paddingTop = 0;
            brieftcaseChart.paddingBottom = 0;
            brieftcaseChart.zoomOutButton.disabled = true;

            if (typeof data === 'string') {
                brieftcaseChart.dataSource.url = data;
            } else {
                brieftcaseChart.data = data;
            }

            brieftcaseChart.dateFormatter.dateFormat = "MMM YYYY";

            let dateAxis = brieftcaseChart.xAxes.push(new am4charts.DateAxis());

            // Hiding chart labels
            dateAxis.renderer.labels.template.disabled = true;
            dateAxis.renderer.grid.template.disabled = true;

            let valueAxis = brieftcaseChart.yAxes.push(new am4charts.ValueAxis());

            // Hiding chart labels
            valueAxis.renderer.labels.template.disabled = true;
            valueAxis.renderer.grid.template.disabled = true;

            let series = brieftcaseChart.series.push(new am4charts.LineSeries());
            series.dataFields.dateX = "date";
            series.dataFields.valueY = "payments";

            // Customizing chart
            series.stroke = am4core.color("#589585");
            series.strokeWidth = '3';
            series.fill = greenGradient;
            series.fillOpacity = 0.3;

            // Adding tooltip
            brieftcaseChart.cursor = new am4charts.XYCursor();
            brieftcaseChart.cursor.lineX.disabled = true;
            brieftcaseChart.cursor.lineY.disabled = true;
            series.tooltip.pointerOrientation = "vertical";
            series.tooltip.background.fillOpacity = 1;
            series.tooltip.background.fill = am4core.color("rgba(33, 35, 47, 0.5)");
            series.tooltip.background.stroke = am4core.color("#589585");
            series.tooltip.background.strokeWidth = 2;
            series.tooltipText = "[text-transform: uppercase; font-size: 12px; #D3D5DA]{dateX}\n[font-weight: 600; font-size: 12px; #589585]+{valueY}";
            series.tooltip.getFillFromObject = false;
            series.tooltip.background.cornerRadius = 0;
            series.tooltip.label.textAlign = "middle";
        }); // end am4core.ready()
    }
}

// создание графиков на главной
document.addEventListener('DOMContentLoaded', () => {
    [...document.querySelectorAll('.briefcase')].forEach(eachCase => {
        const chartHolder = eachCase.querySelector('.briefcase-chart');
        briefcase.createGraph(chartHolder, generateChartData());
    });

});