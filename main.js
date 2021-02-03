$(document).ready(init);

function init() {
    getData();
    newChart();
}

function newChart(o3, nO2, pm10, pm25) {

    $('#myChart').remove(); // this is my <canvas> element
    $('.prova').append(' <canvas id="myChart" width="200" height="200";"></canvas>');

    var ctx = $('#myChart');


    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['O3', 'NO2', 'PM10', 'PM25'],
            datasets: [{
                data: [o3, nO2, pm10, pm25],
                backgroundColor: [
                    'rgba(255, 99, 132,0.7)',
                    'rgba(54, 162, 235,0.7)',
                    'rgba(255, 206, 86,0.7)',
                    'rgba(75, 192, 192,0.7)',
                    'rgba(153, 102, 255,0.7)',
                    'rgba(255, 159, 64,0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });
}




function getData() {

    $('.btnCall').click(function () {




        var targetVal = $('input').val();

        if (targetVal !== '') {

            console.log(targetVal);

            $('input').val('');

            $.ajax({

                url: "https://api.waqi.info/feed/" + targetVal + "/?token=464c8d9a0a9cbc6f282ece75e0d529146f9fdc1c",
                method: "GET",
                success: function (data) {

                    console.log('data', data);

                    //AQI 

                    var classeAQI = parseInt(data['data']['aqi']);

                    $('#classAQI').html(classeAQI);

                    if (classeAQI < 50) {

                        $('.rowGraphic').css('background-color', 'rgba(6, 167, 125, 0.88)');
                        $('.graphic span').css('color', '#000');

                        $('#quality').html('Good');
                    };

                    if (classeAQI > 50) {

                        $('.rowGraphic').css('background-color', 'rgba(247, 240, 109,  0.88');
                        $('.graphic span').css('color', '#000');

                        $('#quality').html('Moderate');

                    };

                    if (classeAQI > 100) {

                        $('.rowGraphic').css('background-color', 'rgba(255, 177, 64, 0.88)');
                        $('.graphic span').css('color', '#000');

                        $('#quality').html('Unhealthy For Sensitive Group');
                    };

                    if (classeAQI > 150) {

                        $('.rowGraphic').css('background-color', 'rgba(175, 27, 63, 0.88)');
                        $('.graphic span').css('color', '#fff');

                        $('#quality').html('Unhealthy ');
                    };

                    if (classeAQI > 200) {

                        $('.rowGraphic').css('background-color', 'rgba(168, 130, 221,0.88)');
                        $('.graphic span').css('color', '#fff');

                        $('#quality').html('Very Unhealthy ');
                    };

                    if (classeAQI > 300) {

                        $('.rowGraphic').css('background-color', 'rgba(100, 87, 166, 0.88)');
                        $('.graphic span').css('color', '#fff');

                        $('#quality').html('Hazardous');
                    };

                    //CITY

                    var city = data['data']['city']['name'];
                    $('#city').html(city);


                    //TEMP

                    var temp = data['data']['iaqi']['t']['v'];

                    $('#temp').html((temp).toFixed(0) + "°");


                    //O3

                    var o3 = data['data']['iaqi']['o3']['v'];


                    //NO2

                    var nO2 = data['data']['iaqi']['no2']['v'];


                    //PM10

                    var pm10 = data['data']['iaqi']['pm10']['v'];

                    //PM25

                    var pm25 = data['data']['iaqi']['pm25']['v'];

                    newChart(o3, nO2, pm10, pm25);

                },
                error: function (err) {

                    console.log(err)
                }
            });
        }

    });
} 