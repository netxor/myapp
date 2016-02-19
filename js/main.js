
// Change Chart type function
function ChangeChartType(chart, series, newType) {
    newType = newType.toLowerCase();
    for (var i = 0; i < series.length; i++) {
        var srs = series[0];
        try {
            srs.chart.addSeries({
                type: newType,
                stack: srs.stack,
                yaxis: srs.yaxis,
                name: srs.name,
                color: srs.color,
                data: srs.options.data
            },
            false);
            series[0].remove();
        } catch (e) {
        }
    }
}

$(document).ready(function() {

  var arr = new Array();

  var options = {

    chart: {
      renderTo: 'chart_1',
      type: "column",
      height: 350,
    },

    title: {
      text: 'Изменения комплексного индекса загрязненности воды на реках Республики Казахстан'
    },

    xAxis: {
      type: 'category',
      title: {
        text: ""
      }
    },

    yAxis: {
      title: {
        text: 'Уровень Загрязнения Реки'
      }
    },

    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.1f}%'
        }
      }
    },

    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b><br/>'
    },

    series: [{
      colorByPoint: true,
      data: arr
    }]

  }

  $.getJSON('http://data.egov.kz/api/v2/pollut_river/data?pretty', function(data) {

    // Populate series
    for (i = 0; i < data.length; i++) {
      arr.push([data[i].river, data[i].index]);
    }

    var chart1 = new Highcharts.Chart(options);

  });

});

// --------------------------------------------------------------------------------
    // Switchers (of the Chart1 type) - onclick handler
    
    $('.switcher').click(function () {
        var newType = $(this).attr('id');
        ChangeChartType(chart1, chart1.series, newType);
    });
