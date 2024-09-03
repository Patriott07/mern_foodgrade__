import express from "express";
import {makeRecipe} from '../controllers/recipe.cotroller.js';

const router = express.Router();

router.post('/create/recipe', makeRecipe);

export const RouteRecipe = router;