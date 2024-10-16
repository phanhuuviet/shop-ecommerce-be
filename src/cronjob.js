const cron = require("node-cron");
const Order = require("./models/OrderProductModel");

// Cron job setup to run every day at midnight
cron.schedule("0 0 * * *", async () => {
    try {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        const ordersToUpdate = await Order.updateMany(
            { isDelivered: false, createdAt: { $lte: threeDaysAgo } },
            { $set: { isDelivered: true, deliveredAt: new Date() } }
        );

        console.log(`${ordersToUpdate.nModified} orders marked as delivered.`);
    } catch (error) {
        console.error("Error updating orders:", error);
    }
});
