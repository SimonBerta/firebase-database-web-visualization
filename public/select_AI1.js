// read dataset from database - AI1 channel
// same code as for the AI0 channel

var datakey2 = "selected";
var element2 = document.getElementById("select_ai1");
element2.addEventListener('change', function () {
    var newPost = [];
    dataJson = [];
    x_data = [];
    y_data = [];
    datakey2 = element2.options[element2.selectedIndex].value;
    //console.log(datakey2);
    if (datakey2 != "selected") {
        var ai0_childref = database.ref('ai1/' + datakey2 + '/1');
        ai0_childref.on("value", function (snap) {
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
            var ai0_child_date_ref = database.ref('ai1/' + datakey2 + '/0');
            ai0_child_date_ref.on("value", function (snap_date) {
                newPost = snap_date.val();
                data_reading_date = newPost[0].date + " " + newPost[1].time;
            });
            // create graph with highcharts style
            var chartAI1 = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart-voltage-ai1', // id of division in body of page, where graph will be placed
                    type: 'line',
                    zoomType: 'xy',
                }, 
                title: {
                    text: 'Sensor voltage - AI1',
                    style: {
                        color: '#ba0202',
                        fontWeight: 'bold',
                        fontSize: "30px",
                        fontType: "Verdana"
                    }
                }, // name of graph
                subtitle: {
                    text: 'Date and time of measurement: ' + data_reading_date + "<br>" + "Child key: " + datakey2,
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
                    series: { color: '#ba0202' } // color of data points and graph line 
                },
                xAxis: { 
                    title: {
                        enabled: true,
                        text: 'Time [s]',
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
                        text: 'Voltage [V]',
                        style: {
                            color: '#000000',
                            fontWeight: 'bold',
                            fontSize: "20px",
                            fontType: "Verdana"
                        }
                    },
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
                credits: { enabled: false }
            });
            chartAI1.render(); // render graph

        }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
        });
    }
});
