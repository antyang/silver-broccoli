import React from 'react';
import _ from 'lodash';
import { Sparklines, SparklinesLine, SparklinesReferenceLine, SparklinesSpots } from 'react-sparklines';

function average(data) {
	return _.round(_.sum(data)/data.length);
}

export default ({ data, symbol, color, units }) => {
	return (
		<div>
			<Sparklines svgHeight={60} svgWidth={180} data={data}>
				<SparklinesLine color={color} />
				<SparklinesReferenceLine type="avg" />
				<SparklinesSpots />
			</Sparklines>
			<div>{average(data)}{symbol} {units}</div>
		</div>
	)
}
