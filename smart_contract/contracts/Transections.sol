//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transections{
    uint256 transectionCount; //This is just the variable declaration

    //Its like a function or method that has to be implemented later
    event Transfer(address from, address recieve, uint amount, string message, uint256 timestamp, string keyword);

    //This is just the object
    struct TransferStruct{
        address sender;
        address recieve;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    //here we have to create the array the objects
    TransferStruct[] transections;

    //This is the function
    function addToBlockchain(address payable reciever, uint amount, string memory message, string memory keyword) public {
        transectionCount +=1;
        transections.push(TransferStruct(msg.sender, reciever, amount, message, block.timestamp, keyword)); //Adding the transetion to the transection list

        //to transfer the amount to the reciever
        emit Transfer(msg.sender, reciever, amount, message, block.timestamp, keyword);
    } 

    //This is the function which is used to get all the transections as array form memory
    function getAllTransections() public view returns (TransferStruct[] memory){
        return transections;
    } 

    //This is the function which is used for getting all the transections' numbers 
    function getTransectionCount() public view returns (uint256) {
        return transectionCount;
    } 

}
