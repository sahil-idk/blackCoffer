require("dotenv").config();
const Sector = require("./models/sectorModel"); 
const mongoose = require("mongoose");
const express = require("express");

const SectorJson = require("./jsondata.json");
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Sector.create(SectorJson);
        console.log("Success");
    } catch (error) {
        console.log(error);
    }
};
start();