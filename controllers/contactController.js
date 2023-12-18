const asyncHandler = require("express-async-handler"); //instead of usinmg try/catch block in each controller for catching error we use express-async-handler
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
  // we use async function in all the methods because when we interact with mongoDB it returns a promise. async used for handling promises better way
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access public
const getIndividualContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc Create contact
//@route POST /api/contacts
//@access public
const createContacts = asyncHandler(async (req, res) => {
  console.log(req.user.id);
  const { name, email, phone } = req.body;
  // const contact = await Contact.find({ user_id: req.user.id });
  const check = await Contact.find({
    email: req.body.email,
    name: name.toLowerCase(),
    phone,
  });

  // if (!contact) {
  //   res.status(400);
  //   throw new Error("User already exists. Please login");
  // }

  if (check.length > 0) {
    res.status(200).json({
      status: 200,
      message: "Contact already exists.",
      data: [check],
    });
  } else {
    const createContact = await Contact.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      title: req.body.title,
      group: req.body.group,
      user_id: req.user.id,
    }); // mongoose command for creating a new record in database.
    if (!name || !email || !phone) {
      res.status(400);
      throw new Error("All fields are mandatory");
    } else {
      res.status(200).json({
        status: 200,
        message: "Contact created successfully.",
        data: [createContact],
      });
    }
  }
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public
const updateContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  console.log(contact);
  console.log("hello" + req.user.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(404);
    throw new Error("User dont have permission to update contact");
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updateContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(404);
    throw new Error("User dont have permission to delete contact");
  }

  const deleteContact = await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json({
    status: 200,
    message: "Contact deleted successfully.",
    data: [req.params.id],
  });
});

module.exports = {
  getContacts,
  getIndividualContact,
  createContacts,
  updateContacts,
  deleteContacts,
};
