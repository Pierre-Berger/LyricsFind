/* eslint-disable no-console */
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// let's create express app

const app = express();

// use some application-level middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// load router

const router = require("./router");

app.use(router);

// ready to export
module.exports = app;
