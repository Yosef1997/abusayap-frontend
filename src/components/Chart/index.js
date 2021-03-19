import React, { Fragment, useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js'
import http from '../../helper/http'

import { connect } from 'react-redux'
const MyChart = (props) => {
  const [chartData, setChartData] = useState({
    color: [],
    day: [],
    amountWeek: []
  })
  useEffect(() => {
    Chart.elements.Rectangle.prototype.draw = function () {
      const ctx = this._chart.ctx
      const vm = this._view
      let left, right, top, bottom, signX, signY, borderSkipped, radius
      let borderWidth = vm.borderWidth
      const cornerRadius = 20

      if (!vm.horizontal) {
        left = vm.x - vm.width / 2
        right = vm.x + vm.width / 2
        top = vm.y
        bottom = vm.base
        signX = 1
        signY = bottom > top ? 1 : -1
        borderSkipped = vm.borderSkipped || 'bottom'
      } else {
        left = vm.base
        right = vm.x
        top = vm.y - vm.height / 2
        bottom = vm.y + vm.height / 2
        signX = right > left ? 1 : -1
        signY = 1
        borderSkipped = vm.borderSkipped || 'left'
      }

      if (borderWidth) {
        const barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom))
        borderWidth = borderWidth > barSize ? barSize : borderWidth
        const halfStroke = borderWidth / 2
        const borderLeft =
          left + (borderSkipped !== 'left' ? halfStroke * signX : 0)
        const borderRight =
          right + (borderSkipped !== 'right' ? -halfStroke * signX : 0)
        const borderTop =
          top + (borderSkipped !== 'top' ? halfStroke * signY : 0)
        const borderBottom =
          bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0)
        if (borderLeft !== borderRight) {
          top = borderTop
          bottom = borderBottom
        }
        if (borderTop !== borderBottom) {
          left = borderLeft
          right = borderRight
        }
      }

      ctx.beginPath()
      ctx.fillStyle = vm.backgroundColor
      ctx.strokeStyle = vm.borderColor
      ctx.lineWidth = borderWidth

      const corners = [
        [left, bottom],
        [left, top],
        [right, top],
        [right, bottom]
      ]

      const borders = ['bottom', 'left', 'top', 'right']
      let startCorner = borders.indexOf(borderSkipped, 0)
      if (startCorner === -1) {
        startCorner = 0
      }

      function cornerAt (index) {
        return corners[(startCorner + index) % 4]
      }

      let corner = cornerAt(0)
      ctx.moveTo(corner[0], corner[1])

      for (let i = 1; i < 4; i++) {
        corner = cornerAt(i)

        const width = corners[2][0] - corners[1][0]
        const height = corners[0][1] - corners[1][1]
        const x = corners[1][0]
        const y = corners[1][1]

        radius = cornerRadius

        if (radius > height / 2) {
          radius = height / 2
        }
        if (radius > width / 2) {
          radius = width / 2
        }

        ctx.moveTo(x + radius, y)
        ctx.lineTo(x + width - radius, y)
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
        ctx.lineTo(x + width, y + height - radius)
        ctx.quadraticCurveTo(
          x + width,
          y + height,
          x + width - radius,
          y + height
        )
        ctx.lineTo(x + radius, y + height)
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
        ctx.lineTo(x, y + radius)
        ctx.quadraticCurveTo(x, y, x + radius, y)
      }

      ctx.fill()
      if (borderWidth) {
        ctx.stroke()
      }
    }
  }, [])

  useEffect(async () => {
    try {
      const { token } = props.auth
      const response = await http(token).get('chart')
      setChartData({
        day: response.data.results.map(item => item.day),
        color: response.data.results.reduce((value, item) => {
          if (item.asSender > item.asReceiver) {
            value.push('#9DA6B5')
          } else {
            value.push('#00D16C')
          }

          return value
        }, []),
        amountWeek: response.data.results.reduce((value, item) => {
          const total = item.asReceiver - item.asSender
          if (total < 0) {
            value.push(total * -1)
          } else {
            value.push(total)
          }

          return value
        }, [])
      })
    } catch (err) {
      console.log(err)
    }
  }, [])

  const data = {
    labels: chartData.day,
    datasets: [
      {
        label: 'Rp.',
        backgroundColor: chartData.color,
        barThickness: 15,
        data: chartData.amountWeek
      }
    ]
  }

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    scales: {
      xAxes: [
        {
          gridLines: {
            lineWidth: 0,
            display: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            display: false,
            min: 0
          },
          gridLines: {
            lineWidth: 0,
            display: false
          }
        }
      ]
    }
  }
  return (
    <Fragment>
      { chartData.day.length > 1
        ? <Bar data={data} options={options} height={168} />
        : <div style={{ minHeight: '168px', textAlign: 'center' }}>
          <p style={{ paddingTop: '60px' }}>No Transaction</p>
        </div>
      }
    </Fragment>
  )
}

const mapStateToProps = (props) => ({
  auth: props.auth
})

export default connect(mapStateToProps)(MyChart)
