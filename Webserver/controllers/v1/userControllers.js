const Users = require("../../models/Users");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const getUserList = asyncHandler(async (req, res) => {
  const user = await Users.find().select("-password").lean();

  // If no users
  if (!user?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(user);
});

const readUser = asyncHandler(async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const user = await Users.findById(idUser);

    if (!user) {
      return res.status(400).json({ message: "No users found" });
    }

    const userDetails = {
      nameCompany: user.nameCompany,
      nameUser: user.name,
      phone: user.phone,
      mail: user.mail,
      address: user.address,
      description: user.description,
      image: user.image
    };

    res.json(userDetails);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

const updateUser = asyncHandler(async (req, res) => {

  const { idUser } = req.params;

  const { nameUser, mail, nameCompany, address, image, description } = req.body;

  // Confirm data
  const missingFields = [];

  // Vérifier les champs manquants
  if (!idUser) {
    missingFields.push('idUser');
  }
  if (!nameUser) {
    missingFields.push('nameUser');
  }
  if (!mail) {
    missingFields.push('mail');
  }
  if (!nameCompany) {
    missingFields.push('nameCompany');
  }
  if (!address) {
    missingFields.push('address');
  }

  if (missingFields.length > 0) {
    return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
  }

  // Does the user exist to update?
  const user = await Users.findById(idUser).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check for duplicate
  const duplicate = await Users.findOne({ nameCompany })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== idUser) {
    return res.status(400).json({ message: "Duplicate username" });
  }

  if (nameUser) user.name = nameUser;
  if (nameCompany) user.nameCompany = nameCompany;
  if (mail) user.mail = mail;
  if (address) user.address = address;
  if (image) user.image = image;
  if (description) user.description = description;

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.name} updated` });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  // Does the user exist to delete?
  const user = await Users.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const reply = `Username ${result.name} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getUserList,
  readUser,
  updateUser,
  deleteUser,
};
