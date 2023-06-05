const firefly = require("firefly");

async function main() {
  const contractInterface = {
    name: "Greeter",
    version: "1.0.0",
    network: "testnet",
    connector: "hyperledger",
    functions: [
      {
        name: "greet",
        inputs: [],
        outputs: [{ name: "greeting", type: "string" }],
      },
    ],
    events: [
      {
        name: "greeted",
        inputs: [{ name: "greeting", type: "string" }],
      },
    ],
  };

// Create another contract using both blockchain ethereum and hyperledger, and the contract is called HelloWorld
//   const contractInterface2 = {
//     name: "HelloWorld",
//     version: "1.0.0",
//     network: "testnet",
//     connector: "ethereum",
//     functions: [
//       {
//         name: "helloWolrd",
//         inputs: [],
//         outputs: [{ name: "greeting", type: "string" }],
//       },
//     ],
//     events: [
//       {
//         name: "greeted",
//         inputs: [{ name: "greeting", type: "string" }],
//       },
//     ],
//   };

  const contract = await firefly.broadcastContractAInterface(contractInterface);
  console.log(contract);

  const greeting = await contract.greet();
  console.log(greeting);

  const event = await contract.on("greeted", (event) => {
    console.log(event);
  });
}

main();
