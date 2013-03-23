var canvas = document.getElementById('canvas')
  , input = document.getElementById('input')
  , ctx = canvas.getContext('2d')
  , height = canvas.height
  , width = canvas.width
  , len = width
  , equation
  , curve

// set default
input.value = '(3 + 20) * x * 57 * (Math.PI / 180) / (Math.PI + 20 * Math.abs(x))'
input.placeholder = input.value
equation = new Function('x', 'return ' + input.value )
curve = makeCurve(len)
graph()

// listen for changes
input.addEventListener('keyup', function(e){
  var eq = input.value
  e.preventDefault()
  try {
    equation = new Function('x', 'return ' + eq )
    // throw if the equation doesn't return a number
    equation(0).toFixed(1)
    curve = makeCurve(len)
    graph()
    input.className = ''
  } catch(err){
    input.className = 'error'
  }
}, false)

// generate the curve array
function makeCurve( samples ){
  var curve = new Float32Array(samples)
    , i = 0
    , x
  for ( ; i < samples; i++ ) {
    x = i * 2 / samples - 1
    curve[i] = equation(x)
  }
  return curve
}

// draw it
function graph() {
  var i = 0
  ctx.clearRect(0, 0, width, height)
  ctx.strokeStyle = '#ccc'
  ctx.lineWidth = 1
  // x axis
  ctx.beginPath()
  ctx.moveTo(0, height / 2)
  ctx.lineTo(width, height / 2)
  ctx.stroke()
  // y axis
  ctx.beginPath()
  ctx.moveTo(width / 2, 0)
  ctx.lineTo(width / 2, height)
  ctx.stroke()
  // curve
  ctx.strokeStyle = 'red'
  ctx.beginPath()
  ctx.moveTo(height, ( curve[i++] + 1 ) * width / 2)
  for (; i < len; ++i ) 
    ctx.lineTo(height - i, ( curve[i++] + 1 ) * width / 2)
  ctx.stroke()
}
