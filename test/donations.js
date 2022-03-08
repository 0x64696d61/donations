const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Donations", function () {
  const my_value = 13
  let acc1
  let acc2
  let donations


  beforeEach(async function()
  {
       [acc1, acc2] = await ethers.getSigners()
       const Donations = await ethers.getContractFactory("Donations", acc1)
       donations = await Donations.deploy();
       await donations.deployed()
   })

  it("Should be deployed", async function () {
    expect(donations.address).to.be.properAddress
  })

  it("Should be possible to donate funds", async function () {
    const tx = await donations.connect(acc1).donate({value: my_value})

    expect(() => tx).to.changeEtherBalances([acc1, donations], [-my_value, my_value])
  })

  it("Should be possible transfer funds to any address", async function () {
    await donations.connect(acc1).donate({value: my_value})
    const tx2 = await donations.connect(acc1).transfer_for_owner(acc2.address, 1)

    expect(() => tx2).to.changeEtherBalances([donations, acc2], [-my_value, my_value])
  })

  it("Should be possible transfer funds for owner only", async function () {
    await donations.connect(acc1).donate({value: my_value})

    expect(donations.connect(acc2).transfer_for_owner(acc1.address, 1)).revertedWith('Only owner can do it...');
  })

  it("Should be possible view all donators", async function () {
    await donations.connect(acc1).donate({value: my_value})
    await donations.connect(acc2).donate({value: my_value})

    expect(await donations.all_donators()).have.members([acc1.address,acc2.address])
  })

  it("Should be possible view donate per address", async function () {
    await donations.connect(acc1).donate({value: my_value})
    await donations.connect(acc1).donate({value: my_value})
    values = await donations.donate_per_addess(acc1.address)

    expect(values.toString()).to.equal(my_value.toString() + ',' + my_value.toString())
  })
});