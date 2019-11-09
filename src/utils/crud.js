export const getOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.user._id

  try {
    const doc = await model
      .findOne({ createdBy: userId, _id: id })
      .lean()
      .exec()

    if (!doc) {
      return res.status(404).end()
    }

    res.status(200).json({ data: doc })
  } catch (error) {
    console.error(error)
    res.status(404).end()
  }
}

export const getMany = model => async (req, res) => {
  try {
    const doc = await model
      .find({ createdBy: req.user._id })
      .lean()
      .exec()

    if (!doc) {
      res.sendStatus(400)
    }

    res.status(200).json({ data: doc })
  } catch (error) {
    console.error(error)
    res.status(400).end()
  }
}

export const createOne = model => async (req, res) => {
  const doc = await model.create({ ...req.body, createdBy: req.user._id })
  return res.status(201).send({ data: doc })

  //   try {
  //     const doc = await model
  //       .create({ ...req.body, createdBy: req.user._id })
  //       .lean()
  //       .exec()
  //     if (!doc) {
  //       res.status(400).end()
  //     }
  //     res.status(201).send({ data: doc })
  //   } catch (error) {
  //     console.error(error)
  //     res.status(400).end()
  //   }
}

export const updateOne = model => async (req, res) => {}

export const removeOne = model => async (req, res) => {}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
