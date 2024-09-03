import { recipes } from "../models/recipe.model.js";
import webpush from 'web-push';
import {getSubscriptions} from '../subs.js';

export const makeRecipe = async (req, res) => {
    const { title, description, ingredients, instructions, nutrition } = req.body;

    try {
        const recipe = await recipes.create({ 
            title, 
            date: new Date(), 
            description, 
            ingredients, 
            instructions, 
            nutrition 
        });

        const payloadNotif = JSON.stringify({
            title: "New Recipe Added!",
            body: `Check out the new recipe: ${title}`,
            icon: "https://cdn.worldvectorlogo.com/logos/next-js.svg",
            data : {
                recipeId : recipe._id
            }
        });

        let subscriptions = getSubscriptions();
        console.log(subscriptions); // []

        subscriptions.forEach(subscription => {
            webpush.sendNotification(subscription, payloadNotif)
                .catch(error => console.error('Error sending notification:', error));
        });

        res.json({ message: "Recipe write complete, thanks for sharing the recipes.", recipe });
    } catch (error) {
        console.log('Error creating recipe:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const CronDeleteAllRecipe = async () => {
    await recipes.deleteMany({});
    console.log('Cron jobs doing great task. All Recipe has removed');
}