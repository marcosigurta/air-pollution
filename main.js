$(document).ready(init);

function init() {
    getData();
    newChart();
}

function newChart(o3,nO2,pm10,pm25) {

    $('#myChart').remove(); // this is my <canvas> element
    $('.prova').append(' <canvas id="myChart" width="200" height="200";"></canvas>');
    
    var ctx =$('#myChart');
    
    
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['O3', 'NO2', 'PM10', 'PM25'],
            datasets: [{
                data: [o3, nO2,pm10,pm25],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
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
                display:false
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

    $('.btnCall').click(function() {

        


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

                    var classe = parseInt(data['data']['aqi']);

                    if (classe < 50) {

                        $('#pollutionClass').css('background-color', '#06A77D');
                        $('#quality').html('Good');
                    };

                    if (classe > 50) {

                        $('#pollutionClass').css('background-color', '#F7F06D');
                        $('#quality').html('Moderate');

                    };

                    if (classe > 100) {

                        $('#pollutionClass').css('background-color', '#FFB140');
                        $('#quality').html('Unhealthy For Sensitive Group');
                    };

                    if (classe > 150) {

                        $('#pollutionClass').css('background-color', '#AF1B3F');
                        $('#quality').html('Unhealthy ');
                    };

                    if (classe > 200) {

                        $('#pollutionClass').css('background-color', '#A882DD');
                        $('#quality').html('Very Unhealthy ');
                    };

                    if (classe > 300) {

                        $('#pollutionClass').css('background-color', '#6457A6');
                        $('#quality').html('Hazardous');
                    };

                    $('#pollutionClass').html(classe);


                    //TEMP

                    var temp = data['data']['iaqi']['t']['v'];

                    $('#temp').html(temp + "°");

                    
                    //O3
                    
                    var o3 = data['data']['iaqi']['o3']['v'];
                    console.log(o3);

                   

                    //NO2

                    var nO2 = data['data']['iaqi']['no2']['v'];
                    console.log(nO2);

                    //PM10

                    var pm10 = data['data']['iaqi']['pm10']['v'];

                    //PM25

                    var pm25 = data['data']['iaqi']['pm25']['v'];

                    newChart(o3,nO2,pm10,pm25);
                    
                },
                error: function (err) {
                    
                    console.log(err)
                }
            });
        }

    });
} 