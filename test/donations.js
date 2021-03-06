const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("Donations", function () {
    const my_value = 13
    let acc1
    let acc2
    let donations

    beforeEach(async function () {
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

        await expect(() => tx).to.changeEtherBalances([acc1, donations], [-my_value, my_value])
    })

    it("Should be possible transfer funds to any address", async function () {
        await donations.connect(acc1).donate({value: my_value})
        const tx2 = await donations.connect(acc1).transfer_for_owner(acc2.address, my_value)


        await expect(() => tx2).to.changeEtherBalances([donations, acc2], [-my_value, my_value])
    })

    it("Should be possible transfer funds for owner only", async function () {
        await donations.connect(acc1).donate({value: my_value})
        const balance_before = await acc1.getBalance()
        try {
            const tx = await donations.connect(acc2).transfer_for_owner(acc1.address, 1)
        } catch (e) {
        }
        const balance_after = await acc1.getBalance()

        await expect(balance_before).eq(balance_after)
    })

    it("Should be no possible transfer less then one wei", async function () {
        try {
            await donations.connect(acc1).donate({value: 0})
            expect(true, 'nooo why true??').to.be.false;
        } catch (e) {

            expect(e.message).include('Donation should be more');
        }
    })

    it("Should be possible view all donators", async function () {
        await donations.connect(acc1).donate({value: my_value})
        await donations.connect(acc2).donate({value: my_value})

        await expect(await donations.all_donators()).have.members([acc1.address, acc2.address])
    })

    it("Should be possible view donate per address", async function () {
        await donations.connect(acc1).donate({value: my_value})
        await donations.connect(acc1).donate({value: my_value})
        await donations.connect(acc2).donate({value: my_value})
        const value = await donations.donate_per_address(acc1.address)

        await expect(value).to.equal(my_value * 2)
    })
});
