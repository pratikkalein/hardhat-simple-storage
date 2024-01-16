// SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

contract SimpleStorage {
    uint256 favNum;

    mapping(string => uint256) public nameTofavNum;

    struct People {
        uint256 favNumber;
        string name;
    }

    function store(uint256 _favNum) public virtual {
        favNum = _favNum;
        retrieve();
    }

    People[] public people;

    function retrieve() public view returns (uint256) {
        return favNum;
    }

    function addPerson(string memory _name, uint256 _favNum) public {
        people.push(People(_favNum, _name));
        nameTofavNum[_name] = _favNum;
    }
}
