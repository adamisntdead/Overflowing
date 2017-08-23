if (!Object.entries) {
  Object.entries = function (obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i) // preallocate the Array
    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]]

    return resArray
  }
}

chrome.storage.sync.get('tally', function (res) {
  const tally = res.tally || []
  const results = {}

  tally.forEach(function (date) {
    results[date] = results[date] + 1 || 1
  })

  const data = Object.entries(results)

  Highcharts.chart('container', {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'Overflowing - How Much You Copy From Stack Overflow'
    },
    subtitle: {
      text: document.ontouchstart === undefined
        ? 'Click and drag to zoom in'
        : 'Pinch the chart to zoom in'
    },
    yAxis: {
      title: {
        text: 'copies'
      }
    },
    xAxis: {
      type: 'datetime'
    },
    legend: {
      enabled: false
    },
    data: {
      dateFormat: 'mm/dd/YYYY'
    },

    series: [
      {
        type: 'line',
        name: 'Copies',
        data: data,
        pointInterval: 24 * 3600 * 1000,
        pointStart: data[0] ? Date.parse(data[0][0]) : Date.parse('07/08/2017')
      }
    ]
  })
})
