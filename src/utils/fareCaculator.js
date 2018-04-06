const calculateFare = (baseFare, costPerMinute, time, costPerKm, distance, surge) => {
	const distanceInKm = distance * 0.001;
	const timeInMin = time / 60;
	const pricePerKm = costPerKm * distanceInKm;
	const pricePerMinute = costPerMinute * timeInMin;
	const totalFare = (baseFare + pricePerKm + pricePerMinute) * surge;
	return Math.round(totalFare);
};

export default calculateFare;