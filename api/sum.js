const _ = (fn) => {
  return function handler(request, response) {
    //console.log(request.body)
    try {
      response.status(200).json(fn(request.body))
    }
    catch(e) {
      response.status(500).json({error: e.toString()})
    }
  }
}

const handler = _(function({a, b}) {
  console.log('function!')
  return {sum: a + b}
})

/*
(request, response) => {
  response.status(200).json({a: 1, b: 2})
}
*/

export default handler
