const CosmosClient = require("@azure/cosmos").CosmosClient;

// Connection parameters
const endpoint = "AccountEndpoint=https://warehouseautomdb.documents.azure.com:443/;AccountKey=C5HnyTBzZcrLMWBD09Geu8iSsqzo02dRmr7yCthQSby01MuKDBWb2xXesGBUDk2iHX2gxFeD0I1QACDbgNe2ZQ==;";
const key = "C5HnyTBzZcrLMWBD09Geu8iSsqzo02dRmr7yCthQSby01MuKDBWb2xXesGBUDk2iHX2gxFeD0I1QACDbgNe2ZQ==";
const databaseId = "ReceivedItems";
const containerId = "ItemsInventory";

// Create a Cosmos DB client instance
const client = new CosmosClient({
  endpoint: endpoint,
  key: key
});

module.exports = async function (context, req) {
    // Extract the item details from the request body
    const item = {
        Date: req.body.Date,
        WarehouseID: req.body.WarehouseID,
        ShippingPO: req.body.ShippingPO,
        ShipmentID: req.body.ShipmentID,
        BoxesRcvd: req.body.BoxesRcvd
    };

    try {
        // Get a reference to the database and container
        const { database } = await client.databases.createIfNotExists({ id: databaseId });
        const { container } = await database.containers.createIfNotExists({ id: containerId });

        // Create a new item in the container
        const { resource: createdItem } = await container.items.create(item);

        // Return the created item
        context.res = {
            status: 201,
            body: createdItem
        };
    } catch (err) {
        // Handle any errors that occur
        console.error(err);
        context.res = {
            status: 405,
            body: err.message
        };
    }
};