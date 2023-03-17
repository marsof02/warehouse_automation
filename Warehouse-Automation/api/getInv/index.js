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

// Get a reference to your database and container
const database = client.database(databaseId);
const container = database.container(containerId);

// Example query to fetch all items in the container
module.exports = async function (context, req) {
  const querySpec = {
    query: "SELECT * FROM c"
  };
  const results = await container.items.query(querySpec).fetchAll();
  context.res = {
    body: results.resources
  };
};