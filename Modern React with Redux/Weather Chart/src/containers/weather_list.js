import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
	// constructor(props){
	// 	super(props)
	//
	// 	this.state = {
	// 		hideRow: true,
	// 	}
	// }
	//
	// handleRow() {
	// 	this.setState({ hideRow: !hideRow })
	// }

	renderCharts(cityData) {
		const { id, name, country, coord } = cityData.city;
		const { lon, lat } = coord;
		const temps = cityData.list.map(w => (w.main.temp - 273) * 1.8 + 32);
		const pressures = cityData.list.map(p => p.main.pressure);
		const humidities = cityData.list.map(h => h.main.humidity);

		return (
			<tr key={`${id}_${lat}_${lon}`} onClick={() => alert('ok')}>
				<td>
					<GoogleMap lon={lon} lat={lat} />
				</td>
				<td><Chart data={temps} symbol='&deg;' color='blue' units="F" /></td>
				<td><Chart data={pressures} color='green' units="hPa" /></td>
				<td><Chart data={humidities} color='black' units="%" /></td>
			</tr>
		)
	}

	renderLol() {
		return (
			<tr key="ol">
				<td>ok</td>
			</tr>
		)
	}

	renderExtraInfo(cityData) {
		const { dt } = cityData.list;
		const weatherList = cityData.list.map(t => t.weather);
		const weatherInfo = [].concat.apply([], weatherList);
		const main = weatherInfo.map(m => m.main).slice(0,3);
		const icon = weatherInfo.map(m => m.icon).slice(0,3);

		const dt_txt = cityData.list.map(d => d.dt_txt).slice(0,3);

		// FIXME: Fix this table nesting issue

		return (
			<tr key={dt}>
				<td>
					<table>
						<tr>{dt_txt}</tr>
						<tr>
						{weatherInfo.map(i =>
							<td>
								<img src={`http://openweathermap.org/img/w/${i.icon}.png`} />{i.description}
							</td>
						).slice(0, 3)}
						</tr>
					</table>
				</td>
			</tr>
		)
	}

	render() {
		const { weather, forecast } = this.props;
		console.log(forecast);
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th>City, Country</th>
						<th>Temperature (F)</th>
						<th>Pressure (hPa)</th>
						<th>Humidity (%)</th>
					</tr>
				</thead>
				<tbody>
					{weather.map(this.renderCharts)}
					{weather.map(this.renderLol)}
					{/*{weather.map(this.renderExtraInfo)}*/}
				</tbody>
			</table>
		)
	}
}

function mapStateToProps({ weather }) {
	return { weather }; // { weather } === { weather: weather}
}

export default connect(mapStateToProps)(WeatherList);
