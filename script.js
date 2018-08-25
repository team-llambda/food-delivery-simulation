var wW = window.innerWidth
var wH = window.innerHeight

const sleep = ms => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

// table data
var tableData = [
	{
		h: 64,
		w: 64,
		x: 64,
		y: 64
	},
	{
		h: 64,
		w: 64,
		x: 64,
		y: 64 * 3
	},
	{
		h: 64,
		w: 64,
		x: 64,
		y: 64 * 5
	},
	{
		h: 64,
		w: 64,
		x: 64,
		y: 64 * 7
	},
	{
		h: 64,
		w: 64,
		x: 64,
		y: 64 * 9
	},
	{
		h: 64 * 3,
		w: 96,
		x: 64 * 4,
		y: 64
	},
	{
		h: 64 * 3,
		w: 96,
		x: 64 * 4,
		y: 64 * 7
	},
	{
		h: 64,
		w: 64 * 10,
		x: 64 * 8,
		y: 64
	}
]

// root svg canvas
var svg = d3
	.select('body')
	.append('svg:svg')
	.attr('width', wW)
	.attr('height', wH)

// create indoor group
var indoorGroup = svg.append('svg:g').attr('id', 'indoor-group')

// render indoor rect
var indoorRect = indoorGroup
	.append('svg:rect')
	.attr('id', 'indoor-rect')
	.attr('height', (wH / 4) * 3)
	.attr('width', (wW / 4) * 3)
	.attr('x', 0)
	.attr('y', 0)
	.attr('fill', '#003523')

var tables = []

// render tables
tableData.forEach((table, index) => {
	tables.push({
		data: table,
		node: indoorGroup
			.append('svg:rect')
			.attr('id', index)
			.attr('fill', '#795231')
			.attr('height', table.h)
			.attr('width', table.w)
			.attr('x', table.x)
			.attr('y', table.y)
	})
})

// render drone hub rect
svg
	.append('svg:rect')
	.attr('id', 'drone-hub-rect')
	.attr('height', 320)
	.attr('width', 160)
	.attr('fill', '#00AF66')
	.attr('x', wW * 0.75 - 160)
	.attr('y', wH * 0.75 - 320)

var mouseX = 0
var mouseY = 0

svg.on('mousemove', function() {
	mouseX = d3.mouse(this)[0]
	mouseY = d3.mouse(this)[1]
})

var inProgressGroup = svg.append('svg:g').attr('id', 'queue-group')
