var queue = []

tables.forEach(tableNode => {
	tableNode.node.on('click', async () => {
		vex.dialog.prompt({
			message: 'What drink would you like?',
			placeholder: 'Name of your drink',
			callback: function(value) {
				queue.push({
					drink: value,
					x: tableNode.data.x + tableNode.data.w / 2 - 16,
					y: tableNode.data.y + tableNode.data.h / 2 - 16
				})

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
				queue.push({
					drink: value,
					x: mouseX,
					y: mouseY
				})

				checkNextDelivery()
			}
		})
	}
})

const checkNextDelivery = () => {
	while (droneAvailable() >= 0) {
		if (queue.length === 0) return
		var location = queue.splice(0, 1)[0]
		console.log('senddrone')
		sendDrone(location.x, location.y)
	}
}

setInterval(() => {
	console.log(droneStatus.filter(d => d).length)
}, 1000)
