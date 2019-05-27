import React, { Component } from 'react';
import { View } from 'react-native';
import { Circle } from 'react-native-svg';
import CircularRing from './CircularRing';
import { ScaleWidth, SetSpText } from './Dimensions';

export default class Temperature extends Component {

	render() {
		return (
			<View style={{ width: ScaleWidth(520), height: ScaleWidth(520) }}>
				<CircularRing
					width={ScaleWidth(520)}
					height={ScaleWidth(520)}
					tabR={SetSpText(20)}
					strokeWidth={SetSpText(6)}
					tabStrokeWidth={0}
					angle={90}
					min={18}
					max={32}
					step={1}
					value={22}
					complete={temp => {

					}}
					valueChange={temp => { }}
					renderCenterView={(cx, cy, r, temp) => (
						<Circle
							// onPress={() => { console.log('click...........') }}
							// onPressIn={() => { alert('in') }}
							onPressOut={() => { alert('out') }}
							cx={cx}
							cy={cy}
							r={r}
							fill={'red'} />
					)}
					enTouch={true}
				/>
				{/* <Svg
					height="100"
					width="100"
				>
					<Circle
						cx="50"
						cy="50"
						r="50"
						fill="pink"
						onPress={() => {
							console.log('onPress')
						}}
						onPressIn={() => {
							console.log('onPressIn')
						}}
						onPressOut={() => {
							console.log('onPressOut')
						}}
						onLongPress={() => {
							console.log('onLongPress')
						}}
					/>
				</Svg> */}
			</View>
		);
	}
}
