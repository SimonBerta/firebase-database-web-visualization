// read selected dataset from database - AI0 channel
var datakey1 = "selected";
var element1 = document.getElementById("select_ai0"); // get html element 
element1.addEventListener('change', function () { // on item change in select menu
    var newPost = [];
    dataJson = [];
    x_data = [];
    y_data = [];
    datakey1 = element1.options[element1.selectedIndex].value; // get child key value from selected item in select menu 
    // debug
    //console.log(datakey1); 
    if (datakey1 != "selected") { // if item with child key from menu is selected
        var ai0_childref = database.ref('ai0/' + datakey1 + '/1'); // database reference
        ai0_childref.on("value", function (snap) { // async function to obtain data with specific child key from database
            newPost = snap.val();
            dataJson = newPost;
            // break data to x and y vectors
            for (let i = 0; i < dataJson.length; i++) {
                x_data = x_data.concat(dataJson[i].x);
            }
            for (let i = 0; i < dataJson.length; i++) {
                y_data = y_data.concat(dataJson[i].y);
            }
            // debug
            //console.log(x_data);
            //console.log(y_data);

            // get date and time of measurement
            var ai0_child_date_ref = database.ref('ai0/' + datakey1 + '/0');
            ai0_child_date_ref.on("value", function (snap_date) {
                newPost = snap_date.val();
                data_reading_date = newPost[0].date + " " + newPost[1].time;
            });
            // create graph with highcharts style
            var chartAI0 = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart-voltage-ai0', // id of division in body of page, where graph will be placed
                    type: 'line', // line graph
                    zoomType: 'xy', // zoomable style of graph
                },
                // name of graph
                title: {
                    text: 'Sensor voltage - AI0',
                    style: { // style of text
                        color: '#282ffc',
                        fontWeight: 'bold',
                        fontSize: "30px",
                        fontType: "Verdana"
                    }
                },
                // subtitle
                subtitle: {
                    text: 'Date and time of measurement: ' + data_reading_date + "<br>" + "Child key: " + datakey1,
                    style: {
                        color: '#000000',
                        fontWeight: 'bold',
                        fontSize: "20px",
                        fontType: "Verdana"
                    }
                },
                series: [{
                    showInLegend: false,
                    data: y_data // dataset with voltage values
                }],
                tooltip: {
                    headerFormat: "Time: {point.x:.3f} s, ",
                    pointFormat: "Voltage: {point.y:.3f} V"
                },
                plotOptions: {
                    line: {
                        animation: false,
                        dataLabels: { enabled: false } 
                    },
                    series: { color: '#282ffc' } // color of data points and graph line 
                },
                xAxis: { 
                    title: {
                        enabled: true,
                        text: 'Time [s]', // x-axis text
                        style: {
                            color: '#000000',
                            fontWeight: 'bold',
                            fontSize: "20px",
                            fontType: "Verdana"
                        }
                    },
                    type: 'linear',
                    categories: x_data, // defined values for x axis - time
                    labels: {
                        format: '{value:.3f}',
                        style: {
                            color: '#000000',
                            //fontWeight: 'bold',
                            fontSize: "14px",
                            fontType: "Verdana"
                        }
                    },
                },
                yAxis: {
                    title: {
                        text: 'Voltage [V]', // y-axis text
                        style: {
                            color: '#000000',
                            fontWeight: 'bold',
                            fontSize: "20px",
                            fontType: "Verdana"
                        }
                    },
                    labels: {
                        format: '{value:.3f}', // format of values
                        style: {
                            color: '#000000',
                            //fontWeight: 'bold',
                            fontSize: "14px",
                            fontType: "Verdana"
                        }
                    },
                },
                credits: { enabled: false }
            });
            // render graph
            chartAI0.render();

        }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name); // send error if read fails 
        });
    }
});

