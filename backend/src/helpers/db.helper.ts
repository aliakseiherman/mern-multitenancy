const getNextId = async (db) => {
  let id = 0

  await new Promise<void>((resolve, reject) => {
    db.findOne({}).sort('-_id').exec((err, member) => {
      id = member ? member._id : 0
      resolve()
    })
  })

  id++

  return id
}

export { getNextId }