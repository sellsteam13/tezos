am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Gradients
    let greyGradient = new am4core.LinearGradient();
    greyGradient.addColor(am4core.color("rgba(134, 139, 152, 0.49)"));
    greyGradient.addColor(am4core.color("rgba(68, 68, 68, 0)"));
    greyGradient.rotation = 90;
    let greenGradient = new am4core.LinearGradient();
    greenGradient.addColor(am4core.color("rgba(88, 149, 133, 0.49)"));
    greenGradient.addColor(am4core.color("rgba(88, 149, 133, 0)"));
    greenGradient.rotation = 90;

    // Create chart
    var chart = am4core.create("statsChart", am4charts.XYChart);

    // Removing padding/margin and zoomBtn from chart
    chart.paddingRight = 0;
    chart.paddingLeft = 0;
    chart.paddingTop = 0;
    chart.paddingBottom = 0;
    chart.zoomOutButton.disabled = true;

    // chart.data = generateChartData();
    chart.dataSource.url = "http://www.json-generator.com/api/json/get/cpuuvznCIy?indent=2";
    window.statsChart = chart;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());

    // Hiding chart labels
    categoryAxis.renderer.labels.template.disabled = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Hiding chart labels
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.tooltip.disabled = true;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.categoryX = "category";
    series.dataFields.valueY = "payments";

    // Customizing chart
    series.stroke = am4core.color("#589585");
    series.strokeWidth = '3';
    series.fill = greenGradient;
    series.fillOpacity = 0.3;

    // Creating scrollbar
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);

    // Disabling scrollbar grip
    chart.scrollbarX.endGrip.disabled = true;
    chart.scrollbarX.startGrip.disabled = true;
    chart.scrollbarX.endGrip.disabled = true;

    // Positioning scrollbar
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    // Customizing scrollbar
    chart.scrollbarX.background.fill = am4core.color("rgba(20, 20, 20, 0.3)");
    chart.scrollbarX.unselectedOverlay.fill = am4core.color("rgba(20, 20, 20, 0.3)");
    chart.scrollbarX.thumb.background.fill = am4core.color("rgba(0, 0, 0, 0.3)");
    chart.scrollbarX.thumb.background.fillOpacity = 1;
    chart.scrollbarX.thumb.strokeWidth = 0;
    chart.scrollbarX.minHeight = 50;
    chart.scrollbarX.marginTop = 0;
    chart.scrollbarX.marginBottom = 0;
    let scrollSeries1 = chart.scrollbarX.scrollbarChart.series.getIndex(0);
    scrollSeries1.filters.clear();
    scrollSeries1.stroke = am4core.color("rgba(20, 20, 20, 0)");
    scrollSeries1.fill = greenGradient;

    // Disabling scrollbar labels
    let scrollAxis = chart.scrollbarX.scrollbarChart.xAxes.getIndex(0);
    scrollAxis.renderer.labels.template.disabled = true;
    scrollAxis.renderer.grid.template.disabled = true;

    // Scaling scrollbar
    categoryAxis.start = 0.65;
    categoryAxis.keepSelection = true;

}); // end am4core.ready()


const statsChartTab = {
    click: (el) => {
        [...document.querySelectorAll('.stats-tabs__item')].forEach(eachBtn => {
            eachBtn != el ? eachBtn.classList.remove('is-active') : eachBtn.classList.add('is-active');
        });
    },
}