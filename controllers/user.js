
const{response} = require('express');

const res = response;

const userGet = (req, res) => {

    const params = req.query;
    res.json({
        msg :"get todo ok controlador ",
        params
    });
  }

  const userPut = (req, res) => {
    const id = req.params.id;
    res.json({
        msg :"put todo ok",
        id
    });
  }

  const userPost = (req, res) => {

    const body = req.body;
    res.json({
        msg :"post todo ok",
        body
    });
  }

  const userDelete = (req, res) => {
    res.json({
        msg :"delete todo ok"
    });
  }

  module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete
  }