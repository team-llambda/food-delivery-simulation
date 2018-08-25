var queue = []

tables.forEach(tableNode => {
	tableNode.node.on('click', async () => {
		vex.dialog.prompt({
			message: 'What drink would you like?',
			placeholder: 'Name of your drink',
			callback: function(value) {
				var order = {
					drink: value,
					x: tableNode.data.x + tableNode.data.w / 2 - 16,
					y: tableNode.data.y + tableNode.data.h / 2 - 16
				}

				orderCounter++

				queue.push(order)

				addToInProgressDisplay(order)

				checkNextDelivery()
			}
		})
	})
})

svg.on('click', () => {
	if (mouseX > wW * 0.75 || mouseY > wH * 0.75) {
		vex.dialog.prompt({
			message: 'What drink would you like?',
			placeholder: 'Name of your drink',
			callback: function(value) {
				if (!value) return

				var order = {
					drink: value,
					x: mouseX,
					y: mouseY
				}

				orderCounter++

				queue.push(order)

				addToInProgressDisplay(order)

				checkNextDelivery()
			}
		})
	}
})

const checkNextDelivery = () => {
	while (droneAvailable() >= 0) {
		if (queue.length === 0) return
		var order = queue.splice(0, 1)[0]
		removeFromInProgressDisplay()
		sendDrone(order.x, order.y, order.drink)
	}
}

var inProgressOrders = []
const addToInProgressDisplay = async order => {
	var orderNode = inProgressGroup
		.append('svg:text')
		.attr('id', orderCounter + '-in-progress')
		.attr('x', wW - 256)
		.attr('y', 24 * inProgressOrders.length + 32)
		.attr('font-family', 'Sofia Pro')
		.attr('font-size', 24)
		.attr('fill', 'white')
		.attr('stroke', 'white')
		.style('text-anchor', 'right')
		.style('opacity', 0)
		.text(() => {
			return '#' + orderCounter + ': ' + order.drink
		})

	orderNode
		.transition()
		.style('opacity', 1)
		.duration(300)

	inProgressOrders.push({
		node: orderNode,
		data: order
	})

	await sleep(300)
}

const removeFromInProgressDisplay = async () => {
	console.log('remove called')
	var remove = inProgressOrders.splice(0, 1)[0]

	remove.node
		.transition()
		.style('opacity', 0)
		.duration(300)

	inProgressOrders.forEach((order, index) => {
		order.node
			.transition()
			.attr('y', index * 24 + 32)
			.duration(300)
	})

	await sleep(300)

	remove.node.remove()
}
