const { ethers, run, network } = require("hardhat");

async function main() {
  //Deploy the contract
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying Contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  console.log("Contract deployed to:", simpleStorage.target);

  //Verify the contract
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    await simpleStorage.waitForDeployment(6);
    await verify(simpleStorage.target, []);
  }

  //Retrieve the current value
  const currentValue = await simpleStorage.retrieve();
  console.log("Current value:", currentValue.toString());

  //Update the current value
  const transactionResponse = await simpleStorage.store(13);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log("Updated value:", updatedValue.toString());
}

async function verify(contracAddress, args) {
  console.log("Verifying Contract...");
  try {
    await run("verify:verify", {
      address: contracAddress,
      constructorArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Contract already verified");
    } else {
      console.log(error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
