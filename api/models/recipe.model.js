import mongoose from 'mongoose';

const shcemaIngredient = mongoose.Schema({
    name : String,
    quantity : String
});

const schemaNutrition = mongoose.Schema({
    calories_per_serving : String,
    protein_per_serving : String,
    carbs_per_serving : String,
    fat_per_serving : String,
});

const Schema = mongoose.Schema({
    title : String,
    date : Date,
    description : String,
    ingredients : [shcemaIngredient],
    instructions : [String],
    nutrition : schemaNutrition
})


export const recipes = mongoose.model('recipes', Schema);