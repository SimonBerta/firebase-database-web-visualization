// this code obtains last measurement values from database and show them in charts 
// first dataset from database
var newPost = [];
dataJson1 = [];
x_data1 = [];
y_data1 = [];
datakey1 = "";
var ai0_ref = database.ref('ai0');
// retrieve new posts as they are added to database
ai0_ref.orderByValue().limitToLast(1).on("value", function (snapshot) { // async function to get key of last child entry in database
    snapshot.forEach((data) => {
        datakey1 = data.key;
    });
    // debug
    //console.log(datakey1);
    dataJson1 = [];
    x_data1 = [];
    y_data1 = [];
    // get data from last entry child in database
    var ai0_childref = database.ref('ai0/' + datakey1 + '/1'); 
    ai0_childref.on("value", function (snap) { // async function to get x,y data from database according to obtained child key
        newPost = snap.val();
        dataJson1 = newPost;
        // break data to x and y vectors
        for (let i = 0; i < dataJson1.length; i++) {
            x_data1 = x_data1.concat(dataJson1[i].x);
        }
        for (let i = 0; i < dataJson1.length; i++) {
            y_data1 = y_data1.concat(dataJson1[i].y);
        }
        // debug
        //console.log(x_data1);
        //console.log(y_data1);

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
                type: 'line',
                zoomType: 'xy',
            }, 
            // name of graph
            title: { 
                text: 'Sensor voltage - AI0',
                style: {
                    color: '#282ffc',
                    fontWeight: 'bold',
                    fontSize: "30px",
                    fontType: "Verdana"
                }
            }, 
            // subtitle
            subtitle: {
                text: 'Last measurement: ' + data_reading_date + "<br>" + "Child key: " + datakey1,
                style: {
                    color: '#000000',
                    fontWeight: 'bold',
                    fontSize: "20px",
                    fontType: "Verdana"
                }
            },
            series: [{
                showInLegend: false,
                data: y_data1 // dataset with voltage values
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
                    text: 'Time [s]',
                    style: {
                        color: '#000000',
                        fontWeight: 'bold',
                        fontSize: "20px",
                        fontType: "Verdana"
                    }
                },
                type: 'linear',
                categories: x_data1, // defined values for x axis
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
        // render graph
        chartAI0.render();
    });

}, (errorObject) => {
    console.log('The read failed: ' + errorObject.name); // send error if read fails
});

// second dataset from database
newPost = [];
dataJson2 = [];
x_data2 = [];
y_data2 = [];
datakey2 = "";
var ai1_ref = database.ref('ai1');
// retrieve new posts as they are added to database
ai1_ref.orderByValue().limitToLast(1).on("value", function (snapshot) { // get key of last entry child in database
    snapshot.forEach((data) => {
        datakey2 = data.key;
    });
    // debug
    //console.log(datakey2);
    dataJson2 = [];
    x_data2 = [];
    y_data2 = [];
    
    var ai1_child_ref = database.ref('ai1/' + datakey2 + '/1');
    ai1_child_ref.on("value", function (snap) { // async function to get x,y data from last child entry in database
        newPost = snap.val();
        dataJson2 = newPost;
        // break data to x and y vectors
        for (let i = 0; i < dataJson2.length; i++) {
            x_data2 = x_data2.concat(dataJson2[i].x);
        }
        for (let i = 0; i < dataJson2.length; i++) {
            y_data2 = y_data2.concat(dataJson2[i].y);
        }
        // debug
        //console.log(x_data2);
        //console.log(y_data2);

        // get date and time of measurement
        var ai1_child_date_ref = database.ref('ai1/' + datakey2 + '/0');
        ai1_child_date_ref.on("value", function (snap_date) {
            newPost = snap_date.val();
            data_reading_date = newPost[0].date + " " + newPost[1].time;
        });
        // create graph with highcharts style
        var chartAI1 = new Highcharts.Chart({ 
            chart: {
                renderTo: 'chart-voltage-ai1',
                type: 'line',
                zoomType: 'xy',
            }, // id of division in body of page, where graph will be placed
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
                text: 'Last measurement: ' + data_reading_date + "<br>" + "Child key: " + datakey2,
                style: {
                    color: '#000000',
                    fontWeight: 'bold',
                    fontSize: "20px",
                    fontType: "Verdana"
                }
            },
            series: [{
                showInLegend: false,
                data: y_data2 // dataset with voltage values
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
                categories: x_data2, // defined values for x axis
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
        // render graph
        chartAI1.render(); 
    });

}, (errorObject) => {
    console.log('The read failed: ' + errorObject.name); // send error if read fails 
});
