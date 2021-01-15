am4core.ready(function() {

    var chart = null;

    const createChart = (urlJson) => {
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
        chart = am4core.create("statsChart", am4charts.XYChart);
        chart.preloader.disabled = false;

        // Removing padding/margin and zoomBtn from chart
        chart.paddingRight = 0;
        chart.paddingLeft = 0;
        chart.paddingTop = 0;
        chart.paddingBottom = 0;
        chart.zoomOutButton.disabled = true;

        // chart.data = generateChartData();
        chart.dataSource.url = urlJson;
        chart.dateFormatter.dateFormat = "MMM YYYY";

        // data loading events
        chart.dataSource.events.on("error", function(ev) {
            $('.stats-tabs__item').not('.is-active').addClass('is-blocked');
            $('.stats-chart__error').removeClass('is-hidden');
        });
        chart.dataSource.events.on("loadstarted", function(ev) {
            $('.stats-tabs__item').not('.is-active').addClass('is-disabled');
        });
        chart.dataSource.events.on("done", function(ev) {
            $('.stats-tabs__item').removeClass('is-disabled');
        });

        // creating axis
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());

        // Hiding chart labels
        dateAxis.renderer.labels.template.disabled = true;
        dateAxis.renderer.grid.template.disabled = true;
        dateAxis.tooltip.disabled = true;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Hiding chart labels
        valueAxis.renderer.labels.template.disabled = true;
        valueAxis.renderer.grid.template.disabled = true;
        valueAxis.tooltip.disabled = true;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "payments";

        // Customizing chart
        series.stroke = am4core.color("#589585");
        series.strokeWidth = '3';
        series.fill = greenGradient;
        series.fillOpacity = 0.3;

        // Creating scrollbar
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);

        // Customizing scrollbar grip
        function customizeGrip(grip) {
            grip.icon.disabled = true;
            grip.background.fill = am4core.color("#589585");
            grip.background.fillOpacity = 1;
            grip.background.disabled = true;
            // Add vertical bar
            let line = grip.createChild(am4core.Rectangle);
            line.height = 50;
            line.width = 3;
            line.fill = am4core.color("#589585");
            line.align = "center";
            line.valign = "middle";
            // add middle icon
            let img = grip.createChild(am4core.Rectangle);
            img.width = 10;
            img.height = 10;
            img.fill = am4core.color("#589585");
            img.rotation = 45;
            img.align = "center";
            img.valign = "middle";
        }

        customizeGrip(chart.scrollbarX.startGrip);
        customizeGrip(chart.scrollbarX.endGrip);

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
        dateAxis.start = 0.65;
        dateAxis.keepSelection = true;

        // Adding tooltip
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineX.disabled = true;
        chart.cursor.lineY.disabled = true;
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.background.fillOpacity = 1;
        series.tooltip.background.fill = am4core.color("rgba(33, 35, 47, 0.5)");
        series.tooltip.background.stroke = am4core.color("#589585");
        series.tooltip.background.strokeWidth = 2;
        series.tooltipText = "[text-transform: uppercase; font-size: 12px; #D3D5DA]{dateX}\n[font-weight: 600; font-size: 12px; #589585]+{valueY}";
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.cornerRadius = 0;
        series.tooltip.label.textAlign = "middle";

        // preloader
        var indicator;
        var indicatorInterval;

        function showIndicator() {

            if (!indicator) {
                indicator = chart.tooltipContainer.createChild(am4core.Container);
                indicator.background.fill = am4core.color("#21232F");
                indicator.width = am4core.percent(100);
                indicator.height = am4core.percent(100);

                var indicatorLabel = indicator.createChild(am4core.Label);
                indicatorLabel.text = "[font-size: 14px]Пожалуйста подождите...\nидёт загрузка графика";
                indicatorLabel.align = "center";
                indicatorLabel.valign = "middle";
                indicatorLabel.textAlign = "middle";
                indicatorLabel.fill = am4core.color("#2A2C3A");
                indicatorLabel.dy = -25;
            }

            indicator.hide(0);
            indicator.show();
        }

        showIndicator();

        chart.events.on("ready", function(ev) {
            indicator.hide();
        });

    };

    // functions for tabs @@ creating chart and updating chart data
    const allTabs = [...document.querySelectorAll('.stats-tabs__item')];
    createChart(allTabs[0].dataset.url);

    allTabs.forEach(eachBtn => {
        eachBtn.addEventListener('click', () => {
            allTabs.forEach(btn => {
                btn != eachBtn ? btn.classList.remove('is-active') : btn.classList.add('is-active');
            });
            $('.stats-tabs__item').addClass('is-disabled');
            chart.dispose();
            chart = null;
            createChart(eachBtn.dataset.url);
        });
    });

}); // end am4core.ready()