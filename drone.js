var orderCounter = 0

var droneStatus = [false, false, false, false, false, false]

const droneAvailable = () => {
	for (var i = 0; i < droneStatus.length; i++) {
		if (!droneStatus[i]) {
			// droneStatus[i] = true
			return i
		}
	}
	return -1
}

const getBaseLocation = droneInUse => {
	const startX = wW * 0.75 - 80
	const startY = wH * 0.75 - 320 + 32 * (droneInUse * 1.25 + 1)

	return {
		x: startX - 16,
		y: startY
	}
}

const sendDrone = async (x, y, drink) => {
	var droneInUse = droneAvailable()
	if (droneInUse === -1) {
		return
	}

	droneStatus[droneInUse] = true

	const startPosition = getBaseLocation(droneInUse)

	const startX = startPosition.x
	const startY = startPosition.y

	var drone = svg
		.append('rect')
		.attr('id', orderCounter)
		.attr('fill', '#87C3FF')
		.attr('width', 16)
		.attr('height', 16)
		.attr('x', startX)
		.attr('y', startY)
		.style('opacity', 0)

	var droneDrink = svg
		.append('svg:text')
		.attr('id', orderCounter + '-drink')
		.attr('x', startX + 16)
		.attr('y', startY + 48)
		.attr('font-family', 'Sofia Pro')
		.attr('font-size', 16)
		.attr('fill', 'white')
		.attr('stroke', 'white')
		.style('text-anchor', 'middle')
		.style('opacity', 0)
		.text(() => {
			return '#' + orderCounter + ': ' + drink
		})

	drone
		.transition()
		.style('opacity', 1)
		.attr('width', 32)
		.attr('height', 32)
		.duration(1000)

	droneDrink
		.transition()
		.style('opacity', 1)
		.duration(1000)

	await sleep(1000)

	const length = Math.sqrt(
		(startX - x) * (startX - x) + (startY - y) * (startY - y)
	)

	drone
		.transition()
		.attr('x', x)
		.attr('y', y)
		.duration(length * 2)
		.ease(d3.easeLinear)

	droneDrink
		.transition()
		.attr('x', x + 16)
		.attr('y', y + 48)
		.duration(length * 2)
		.ease(d3.easeLinear)

	await sleep(length * 2)

	drone
		.transition()
		.attr('width', 16)
		.attr('height', 16)
		.duration(1000)

	await sleep(1000)

	droneDrink
		.transition()
		.style('opacity', 0)
		.duration(1000)

	await sleep(1000)

	droneDrink.remove()

	await sleep(1000)

	drone
		.transition()
		.attr('width', 32)
		.attr('height', 32)
		.duration(1000)

	await sleep(1000)

	drone
		.transition()
		.attr('x', startX)
		.attr('y', startY)
		.duration(length * 2)
		.ease(d3.easeLinear)

	await sleep(length * 2)

	drone
		.transition()
		.style('opacity', 0)
		.attr('width', 16)
		.attr('height', 16)
		.duration(1000)

	await sleep(1000)

	drone.remove()

	droneStatus[droneInUse] = false

	checkNextDelivery()
}
