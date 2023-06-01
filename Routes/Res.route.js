const express = require("express");
const { ResModel } = require("../Model/resturant.model");
const { authenticate } = require("../middleware/authenticate");
const resRouter = express.Router();

resRouter.get("/restaurants",authenticate,async(req,res)=>{
    const restaurantsData = await ResModel.find()
    res.status(200).send(restaurantsData)
})

resRouter.get("/restaurants/:id",async(req,res)=>{
    const id = req.params.id;
    const restaurantsData = await ResModel.find({_id:id})
    res.status(200).send(restaurantsData)
})

resRouter.get("/restaurants/:id/menu",async(req,res)=>{
    const id = req.params.id;
    const restaurantsData = await ResModel.find({_id:id})
    res.status(200).send(restaurantsData)
})

resRouter.post("/restaurants",authenticate,async(req,res)=>{
    try {
       const resData = new ResModel(req.body)
       await resData.save();
       res.send("Restaurant Registered")
    } catch (error) {
        console.log(error);
        res.send("Error While posting restaurant data")
    }
})

resRouter.post("/restaurants/:id/menu",authenticate,async(req,res)=>{
    const id = req.params.id;
    const resData = await ResModel.find({_id:id})
    const data = req.body;
    // res.send(data);
    try {
        if(resData.length>0){
            // const menu = resData[0].menu.push(data)
            // await menu.save

            const x = await ResModel.updateOne({_id:id},{$push:{menu:data}})
            res.send("menu submitted")
        }else{
            res.send("Register restaurant first")
        }
    } catch (error) {
        console.log(error)
        res.send("Error While posting menu data")
    }
})

resRouter.delete("/restaurants/:id/menu/:delId",async(req,res)=>{
    const id = req.params.id;
    const resData = await ResModel.find({_id:id})
    const deleteId =  req.params.delId
    // res.send(data);
    try {
       let x = resData[0].menu.filter((e,index)=>{
        if(e._id == deleteId){
            return e
        }
       })
       let del = x[0]._id;
       console.log(del)
       const y = await ResModel.findOneAndDelete({_id:del}) 
       console.log(y)
       res.send("Data deleted")
    } catch (error) {
        console.log(error)
        res.send("Error While delete menu data")
    }
})

module.exports ={
    resRouter
}