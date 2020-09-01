const mongoose = require('mongoose');
const User = require("./user");
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    try {
      const users = await User.find();
      
      var table = "";
      table += "<div>";
      table +=    "<a href='/register'>Registrarse</a>";
      table +=    "<table>";
      table +=      "<thead><tr><th>Name</th><th>Email</th></tr></thead>";
      table +=      "<tbody>";
        users.forEach(function(e) {
          table += `<tr><td>${e.name}</td><td>${e.email}</td></tr>`;
        });
      table +=      "</tbody>";
      table +=    "</table>";
      table += "</div>";
  
      res.send(table);
  
    } catch(e) {
      res.status(500).statusMessage("se presento un error");
    }
});

router.get('/register', async(req, res) => {
    res.send(`
      <form action="/register" method="post">
        <label for="name">Name</label><br>
        <input type="text" id="name" name="name"><br>
        <label for="email">Email</label><br>
        <input type="email" id="email" name="email"><br>
        <label for="password">Password</label><br>
        <input type="password" id="password" name="password"><br>
        <button type="submit">Enviar</button>
      </form>
    `);
});

router.post('/register', async (req, res) => {
    if (req.body) {
      const { name, email, password } = req.body;

      try {
        await User.create({ name, email, password });
      } catch(e) {
          console.error(e);
      }
      res.redirect('/');
    }
});

module.exports = router;