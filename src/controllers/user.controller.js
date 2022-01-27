const user = require('../usecases/user.usecase')

async function createUser(request,response) {
try {
    const newUser = request.body
    const createUser = await user.createUser(newUser)
    response.statusCode = 201
    response.json({
        success: true,
        message: 'User succesfully created!',
        data: {
            recipe: newUser,
        }
    })
} catch (error) {
    console.error(error);
    response.statusCode = 500
    response.json({
        success: false,
        message: 'Could not create user',
        error,
    })
}
}

async function getAllUsers(request,response) {
    try {
        const allUsers = await user.getAllUsers()
        console.log('all_users: ' + allUsers.length);

        response.statusCode = 200
        response.json({
            success: true,
            message: 'Users',
            data: {
                users: allUsers,
            }
        })
    } catch (error) {
        console.error(error);
        response.statusCode = 500
        response.json({
            success: false,
            message: 'Could not get users',
            error,
        })
    }
  }

  async function updateUser(request, response) {
    try {
      const id = request.params.id;
      const newData = request.body
      
      const editUser = await user.updateUser(id, newData);
  
      response.statusCode = 200;
      response.json({
        success: true,
        message: "User succesfully updated!",
        data: {
          recipe: editUser,
        },
      });
    } catch (error) {
      console.error(error);
      response.statusCode = 500;
      response.json({
        success: false,
        message: "Could not update user",
        error,
      });
    }
  }

  async function getUserById(request, response){

    const id = request.params.id
    try{
        const getUserById = await user.getUserById(id)

        response.json({
            success: true,
            message: id,
            data: {
              getUserById,
            }
        })
    }catch(error){
        console.error(error);
        response.statusCode = 500;
        response.json({
            success: false,
            message: 'Could not get user.',
            error,
        })
    }
  }

  async function deleteUser(request,response){

    const id = request.params.id;
    try {
        const deleteUser = await user.deleteUser(id)

        response.statusCode = 200
        response.json({
            success: true,
            message: 'user succesfully deleted!'
            })
    } catch (error) {
        console.error(error);
        response.statusCode = 500
        response.json({
            success: false,
            message: 'Could not delete user',
            error,
        })
    }
}


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
}