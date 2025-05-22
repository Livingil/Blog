import { useEffect, useState } from 'react';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	const [city, setCiy] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeather] = useState('');

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Severodvinsk&units=metric&lang=ru&appid=592b40a32ebbb356bcabefd39ea0802f',
		)
			.then((res) => res.json())
			.then(({ name, main, weather }) => {
				setCiy(name);
				setTemperature(Math.round(main.temp));
				setWeather(weather[0].description);
			});
	}, []);
	return (
		<div className={className}>
			<div>
				<div>Blog web-developer</div>
				<div>web@developer.org</div>
			</div>
			<div>
				<div>
					{new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
				</div>
				<div>{city}</div>
				<div>
					{temperature} degrees, {weather}
				</div>
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 1000px;
	height: 120px;
	padding: 10px 40px;
	box-shadow: 0px 2px 17px #000;
	background-color: #fff;
	font-weight: bold;
`;
