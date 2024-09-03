import cron from 'node-cron';
let i = 0;

import {CronDeleteAllRecipe} from '../controllers/recipe.cotroller.js';

cron.schedule('*/15 * * * *', () => {
    CronDeleteAllRecipe();
})

