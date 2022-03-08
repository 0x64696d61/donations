// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Donations {
	address private owner;
	address[] private all_addresses;

	struct Donator {
		uint256 value;
	}

	mapping (address => Donator) donators;

	constructor() {
		owner = msg.sender;
	}

	function donate() public payable {
		require(msg.value > 0, "WTF?");

		if (donators[msg.sender].value == 0)
			all_addresses.push(msg.sender);
		donators[msg.sender].value += msg.value;
	}

	function transfer_for_owner(address payable _addr, uint256 _value) external payable {
		require(msg.sender == owner, "Only owner can do it...");

		(bool success, ) = _addr.call{value:_value}("");
		require(success, "Transfer failed.");
	}

	function all_donators() public view returns (address[] memory) {
		return all_addresses;
	}

	function donate_per_addess(address addr) public view returns (uint256) {
		return donators[addr].value;
	}

}
