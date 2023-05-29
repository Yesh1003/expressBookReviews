const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const axios = require('axios');
const baseURL = 'http: localhost/*'; // Replace with your API base URL



public_users.post("/register", (req,res) => {
  
  const { username, password } = req.body;

  // Check if the username is already taken
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Create a new user object
  const newUser = { username, password };

  // Add the new user to the users array
  users.push(newUser);

  return res.status(200).json({ message: "User registered successfully" });
});

// Get the book list available in the shop using promise callbacks
public_users.get('/',function (req, res) {
  //Write your code here
  axios.get(`${baseURL}/books`)
    .then(response => {
      const bookList = response.data.filter(book => book.available);
      return res.status(200).json(bookList);
    })
    .catch(error => {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

// Get book details based on ISBN using promise callbacks
public_users.get('/isbn/:isbn',function (req, res) {
  
    const isbn = req.params.isbn;
  
    axios.get(`${baseURL}/books/${isbn}`)
      .then(response => {
        const bookDetails = response.data;
        return res.status(200).json(bookDetails);
      })
      .catch(error => {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      });
  
 });
  
// Get book details based on authorusing promise callbacks
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;

  axios.get(`${baseURL}/books?author=${author}`)
    .then(response => {
      const bookList = response.data;
      return res.status(200).json(bookList);
    })
    .catch(error => {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

// Get all books based on title using promise callbacks
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;

  axios.get(`${baseURL}/books?title=${title}`)
    .then(response => {
      const bookList = response.data;
      return res.status(200).json(bookList);
    })
    .catch(error => {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const bookList = books.filter(book => book.available); // Filter available books
  return res.status(200).json(bookList);
});

module.exports.general = public_users;
