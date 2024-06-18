const express = require('express');

const Sector = require('../models/sectorModel');


const getData =async (req, res) => { 

    let data;
    try {
        data = await Sector.find(req.query);
        console.log("fetched successfully ");
        res.status(200).send(data);
    }
    catch (error) {
        res.status(500).send('An error occurred');
        console.log(error);
    }
}

const getDataByQuery = async (req, res) => {
    let data;
    try {
        console.log(req.query);
        const query = {};
       // List of fields to be filtered
    const fields = [
        'end_year', 'intensity', 'sector', 'topic', 'insight', 'url',
        'region', 'start_year', 'impact', 'added', 'published', 'country',
        'relevance', 'pestle', 'source', 'title', 'likelihood'
      ];
  
      // Dynamically construct the query object
      fields.forEach(field => {
        if (req.query[field]) {
          // Use case-insensitive regex for string fields
          if (typeof req.query[field] === 'string') {
            query[field] = { $regex: new RegExp(`^${req.query[field]}$`, 'i') };
          } else {
            // Match the exact value for non-string fields
            query[field] = req.query[field];
          }
        }
      });
    
        // Fetch data from the database based on the query
     
        data = await Sector.find(query);
        console.log("fetched successfully ");
        res.status(200).send(data);
    }
    catch (error) {
        res.status(500).send('An error occurred');
        console.log(error);
    }
}


exports.getData = getData;
exports.getDataByQuery = getDataByQuery;