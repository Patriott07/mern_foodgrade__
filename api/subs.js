
let subscriptions = [];

export const addSubscription = (subscription) => {
    subscriptions.push(subscription);
    console.log('Subscription added:', subscription); // Log the subscription being added
};

export const getSubscriptions = () => {
    return subscriptions;
};
