function getWeather() {
	const apiKey = `ac537f9a274f1d751e10f0bd28cf5c85`;
	const city = document.getElementById('city').value;

	if (!city) {
		alert('Please enter a city');
		return;
	}

	const currentWeatherUrl = `https://api.openweathermap.org/
	data/2.5/weather?q=${city}&appid=${apiKey}`;
	const forecastUrl = `https://api.openweathermap.org/
	data/2.5/forecast?q=${city}&appid=${apiKey}`;

	fetch(currentWeatherUrl)
		.then(response => response.json())
		.then(data => {
			displayWeather(data);
		})
		.catch(error => {
			console.error('Error fetching current weather data:', error);
			alert('Error fetching current weather data.Please try again');
		});

	fetch(forecastUrl)
		.then(response => response.json())
		.then(data => {
			displayHourlyForecast(data.list);
		})
		.catch(error => {
			console.error('Error fetching hourly forecast data:', error);
			alert('Error fetching current hourly forecast .Please try again');
		});
}

function displayWeather(data) {
	const tempDivInfo = document.getElementById('temp-div');
	const weatherInfoDiv = document.getElementById('weather-info');
	const weatherIcon = document.getElementById('weather-icon');
	const hourlyForecastDiv = document.getElementById('hourly-forecast');

	// Clear previous content
	weatherInfoDiv.innerHTML = '';
	hourlyForecastDiv.innerHTML = '';
	tempDivInfo.innerHTML = '';

	if (data.cod === '404') {
		weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
	} else {
		const cityName = data.name;
		const temperature = Math.round(data.main.temp - 273.15);
		const description = data.weather[0].description;
		const iconCode = data.weather[0].icon;
		const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

		const temperatureHTML = `<p>  ${temperature}&deg;</p>`;
		const weatherHTML = `
		      <p><strong>${cityName}</strong></p>
				<p>${description}</p>
				`;

		weatherInfoDiv.innerHTML = weatherHTML;
		tempDivInfo.innerHTML = temperatureHTML;
		weatherIcon.src = iconUrl;
		weatherIcon.alt = description;

		showImage();

	}

}


function displayHourlyForecast(hourlyData) {
	const hourlyForecastDiv = document.getElementById('hourly-forecast');
	const next24Hours = hourlyData.slice(0, 8);

	next24Hours.forEach(item => {
		const dateTime = new Date(item.dt * 1000);
		const hour = dateTime.getHours();
		const temperature = Math.round(item.main.temp - 273.15);
		const iconCode = item.weather[0].icon;
		const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

		const hourlyItemHTML = `
			<div class="hourly-item">
			   <span>${hour}:00</span>
				<img src="${iconUrl}" alt="Hourly weather icon">
				<span>${temperature}	&deg;</span>
			</div>`;
		hourlyForecastDiv.innerHTML += hourlyItemHTML;
	})
}


function showImage() {
	const weatherIcon = document.getElementById('weather-icon');
	weatherIcon.style.display = 'block';
}

