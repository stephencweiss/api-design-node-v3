const mockController = (req, res) => {
  res.send({ data: 'hello' })
}

const getMany = (req, res) => {}
const createOne = (req, res) => {}
const getOne = (req, res) => {}
const updateOne = (req, res) => {}
const deleteOne = (req, res) => {}

export default {
  getMany,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  mockController
}
