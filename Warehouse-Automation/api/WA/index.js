const fs = require('fs');
const { CosmosClient } = require('@azure/cosmos');

// Connection parameters
const endpoint = "AccountEndpoint=https://warehouseautomdb.documents.azure.com:443/;AccountKey=C5HnyTBzZcrLMWBD09Geu8iSsqzo02dRmr7yCthQSby01MuKDBWb2xXesGBUDk2iHX2gxFeD0I1QACDbgNe2ZQ==;";
const key = "C5HnyTBzZcrLMWBD09Geu8iSsqzo02dRmr7yCthQSby01MuKDBWb2xXesGBUDk2iHX2gxFeD0I1QACDbgNe2ZQ==";
const databaseId = "ReceivedItems";
const containerId = "ItemsInventory";

module.exports = async function (context, req) {
    

    const client = new CosmosClient({ endpoint });
    const database = client.database(databaseId);
    const container = database.container(containerId);

    const jsonData = fs.readFileSync('data.json');
    const items = JSON.parse(jsonData);

    for (const item of items) {
        await container.items.create(item);
    }

    try {
        const jsonData = fs.readFileSync('data.json');
        const items = JSON.parse(jsonData);

        for (const item of items) {
            await container.items.create(item);
        }

        context.res = {
            status: 200,
            body: 'Items added successfully'
        };
    } catch (error) {
        context.log.error(error.stack);
        context.res = {
            status: 500,
            body: 'Error adding items to database'
        };
    }
    
}




