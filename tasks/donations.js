// npx hardhat donations_do_donate --address 0xf3f423DcE9b9dE9EE1e1540bc4e73238Db885b0E --amount 1 --network rinkeby
task("donations_do_donate", "Make a donation")
  .addParam("address", "Contract address")
  .addParam("amount", "The amount of donations in wei")
  .setAction(async (taskArgs) => {
    const [acc1] = await ethers.getSigners()
    const Donators = await ethers.getContractFactory('Donations');
    const donations = await Donators.attach(taskArgs.address)
    await donations.connect(acc1).donate({value: taskArgs.amount})
});

// npx hardhat donations_transfer --address 0xf3f423DcE9b9dE9EE1e1540bc4e73238Db885b0E --to-address 0x5a67861E29edaa4CaA6111A9D75c180994E4B253 --amount 1 --network rinkeby
task("donations_transfer", "Transfer coins to another address")
  .addParam("address", "Contract address")
  .addParam("toAddress", "To address")
  .addParam("amount", "Amount in wei")
  .setAction(async (taskArgs) => {
    const Donators = await ethers.getContractFactory('Donations')
    const donations = await Donators.attach(taskArgs.address)
    await donations.transfer_for_owner(taskArgs.toAddress, taskArgs.amount)
});

// npx hardhat donations_all_donators --address 0xf3f423DcE9b9dE9EE1e1540bc4e73238Db885b0E --network rinkeby
task("donations_all_donators", "Prints all donation addresses")
  .addParam("address", "Contract address")
  .setAction(async (taskArgs) => {
    const Donators = await ethers.getContractFactory('Donations')
    const donators = await Donators.attach(taskArgs.address)
    const out = await donators.all_donators()
    console.log(out)
});

// npx hardhat donations_donate_per_addess --address 0xf3f423DcE9b9dE9EE1e1540bc4e73238Db885b0E --donator-address 0x5a67861E29edaa4CaA6111A9D75c180994E4B253 --network rinkeby
task("donations_donate_per_addess", "Prints donation amount per address")
  .addParam("address", "Contract address")
  .addParam("donatorAddress", "Donator address")
  .setAction(async (taskArgs) => {
    const Donators = await ethers.getContractFactory('Donations')
    const donators = await Donators.attach(taskArgs.address)
    const out = await donators.donate_per_addess(taskArgs.donatorAddress)
    console.log(out.toString())
});
