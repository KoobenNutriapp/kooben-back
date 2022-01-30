const User = require ('../models/user.model')

async function createUser(user) {
  return await User.create(user)
}

async function getAllUsers() {
  const getAllUsers = await User.find()
  return getAllUsers
}

async function updateUser(id,user) {
  return await User.updateOne({_id: id},user)
}

async function getUserById(id){
  return await User.findById(id)
}

async function deleteUser(id){
  return await User.findByIdAndRemove(id)
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
}
