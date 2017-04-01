const express = require('express')

const router = new express.Router()
import mongoose from 'mongoose'
import patient from './../db/models/patient'

router.get('/', (req, res) => {
  patient.find({},function (err,data) {
        if (err) {
          console.error(err)
          res.response(500).json({"Error":"Failled While Fetching"})
        }
        if(!data){
          res.status(200).json({"Error":"No records found"})
        }
        else{
          res.status(200).json(data)
        }
      })
})

router.post('/add',(req,res) => {
  let data = new patient(req.body)
  data.save(function (err,data) {
      if (err) {
        console.error(err)
        res.response(500).json({"Error":"Error While Saving"})
      }
      res.status(200).json(data)
    })
})

export default router
