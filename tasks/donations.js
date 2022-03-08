// Не успеваю(

task("donationsDo_donate", "Make a donation")
  .addParam("address", "Contract address")
  .addParam("amount", "The amount of donations")
  .setAction(async (taskArgs) => {
    /// not implementer yed
});

task("donationsTransfer", "Transfer coins to another address")
  .addParam("address", "Contract address")
  .addParam("toAddress", "to address")
  .setAction(async (taskArgs) => {
    /// not implementer yed
});

task("donationsAll_donators", "Prints all donation addresses")
  .addParam("address", "Contract address")
  .setAction(async (taskArgs) => {
    /// not implementer yed
});

task("donationsDonate_per_addess", "Prints donation amount per address")
  .addParam("address", "Contract address")
  .addParam("donatorAddress", "Donator address")
  .setAction(async (taskArgs) => {
    /// not implementer yed
});
