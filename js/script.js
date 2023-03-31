const DAY_MAP = ['SUN', 'MON', 'TUE', 'WEN', 'THU', 'FRI', 'SUT'];
const weatherContainer = document.querySelector('.weather-container');
const weatherTitle = document.createElement('h1');

async function getWeather() {
	const apiKey = 'b35878a2c5ab36e25486221e2dcd1cc3';
	const URL = 'http://api.openweathermap.org/data/2.5/forecast?';
	let city = 'Moscow';

	let response = await fetch(URL + `q=${city}` + `&appid=${apiKey}` + '&units=metric')
	let data = await response.json();
	const days = new Map();

	data.list.forEach(dateItem => {
		console.log(dateItem)
		let parentDate = dateItem.dt_txt.slice(0, -9);
		let filteredDays = data.list.filter(dateItem => dateItem.dt_txt.slice(0, -9) === parentDate); // группируем элементы по дате
		filteredDays = filteredDays.filter((dateItem, index, arr) => index === Math.round(arr.length / 2));  // выбираем средний элемент
		filteredDays.forEach((item) => days.set(parentDate, item));
	})
	//console.log(days);

	weatherTitle.innerHTML = 'Weather in ' + data.city.name;
	weatherContainer.append(weatherTitle);

	createElement(days);

	let results = await Promise.all(days);
	return data;
}

function createElement(days) {
	for (let item of days.values()) {
		//console.log(item)

		let weatherItem = document.createElement('div');
		weatherItem.classList.add('weather-container__item');
		weatherContainer.append(weatherItem);

		let weekDay = document.createElement('div');
		let dateItem = new Date(item.dt_txt);
		let numDay = dateItem.getDay();
		let nameDay = DAY_MAP[numDay];
		weekDay.innerHTML = nameDay;
		weatherItem.append(weekDay);
		let weatherIcon = document.createElement('img');
		weatherIcon.src = 'https://openweathermap.org/img/wn/' + item.weather[0]['icon'] + '@2x.png';
		weatherItem.append(weatherIcon);

		let itemTemperature = document.createElement('div');
		itemTemperature.classList.add('weather-container__temperature');
		itemTemperature.innerHTML = Math.round(item.main.temp) + ' °C';
		weatherItem.append(itemTemperature);
	}
}
const fetchData = async () => {
	const days = await getWeather();
	return days;
	//console.log(days)
}
//console.log(fetchData())
fetchData()