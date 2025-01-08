
const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = weatherForm.location.value;
    fetch('/weather?address=' + address)
        .then(res => res.json())
        .then(data => {
            if(data.error) {
                document.querySelector('#weather-container').innerHTML = "<p style='color:red;text-align: center'>" + data.error + "</p>";
                return;
            }
            document.querySelector('#weather-container').innerHTML = "<div class=''><img src="
                + data.picture +
                " alt='weather'></div></div><p>Weather in " + data.location + " : </p>" + "<p>" + data.forecast + "</p>";
        })
})