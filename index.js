const firefly = require("firefly");

async function main() {
  // Create a new contract interface
  const contractInterface = {
    name: "MyContract",
    version: 1,
    network: "ethereum",
    connector: "hyperledger",
    functions: [
      {
        name: "addOwner",
        inputs: [
          {
            name: "owner",
            type: "string",
          },
        ],
        outputs: [],
      },
    ],
    events: [
      {
        name: "OwnerAdded",
        inputs: [
          {
            name: "owner",
            type: "string",
          },
        ],
      },
    ],
  };

  // Broadcast the contract interface to the network
  const response = await firefly.broadcastContractInterface(contractInterface);
  console.log("Contract interface broadcasted successfully!", response);

  // Create an HTTP API for the contract
  const api = await firefly.createApi(contractInterface);

  // Add the owner to the contract
  const response2 = await api.addOwner("my-owner");
  console.log("Owner added successfully!", response2);

  // Check that the owner was added successfully
  const event = await firefly.waitForEvent("OwnerAdded", {
    owner: "my-owner",
  });

  console.log("Owner added successfully!");
}

main().catch(console.error);