
function makeChart(elementId, columnCode, url) {
    $.ajax({
        url: url,
        type:'POST',
        dataType:'JSON',
        data:{columnCode: columnCode},
        success: function(response) {
            const data = response.data[0]
            loadChart($("#" + elementId)[0], data.title, data.columnName, data.rows)
        }
    })
}
function loadChart(element, chartTitle, chartColumnName, chartRows) {
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});
    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(function () {
        drawChart(element, chartTitle, chartColumnName, chartRows)
    });
}
function drawChart(element, chartTitle, chartColumnName, chartRows) {
    // Create the data table.
    const data = new google.visualization.DataTable();
    data.addColumn('string', chartColumnName);
    data.addColumn('number', '数量');
    data.addRows(chartRows);
    // Set chart options
    const options = {
        'title': chartTitle,
        'width': 900,
        'height': 480
    };
    // Instantiate and draw our chart, passing in some options.
    const chart = new google.visualization.PieChart(element);
    chart.draw(data, options);
}