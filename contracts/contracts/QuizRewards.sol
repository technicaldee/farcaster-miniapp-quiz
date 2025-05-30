// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract QuizRewards is ERC721URIStorage, Ownable {
    // Simple counter for token IDs
    uint256 private _nextTokenId;
    
    // Mapping to track if a user has completed the quiz
    mapping(address => bool) public hasCompletedQuiz;
    
    // Mapping to store user scores
    mapping(address => uint256) public userScores;
    
    // Base URI for NFT metadata
    string private _baseTokenURI;
    
    // Events
    event QuizCompleted(address indexed user, uint256 score);
    event RewardMinted(address indexed user, uint256 tokenId);

    constructor(string memory name, string memory symbol) 
        ERC721(name, symbol) 
        Ownable(msg.sender)
    {}

    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    // Function to complete quiz and mint reward NFT
    function completeQuiz(uint256 score) public {
        require(!hasCompletedQuiz[msg.sender], "Quiz already completed");
        require(score > 0, "Score must be greater than 0");
        
        hasCompletedQuiz[msg.sender] = true;
        userScores[msg.sender] = score;
        
        // Mint NFT reward
        uint256 newTokenId = _nextTokenId++;
        
        // Create metadata URI based on score
        string memory tokenURI = string(abi.encodePacked(
            _baseTokenURI,
            "/",
            _toString(score),
            ".json"
        ));
        
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        emit QuizCompleted(msg.sender, score);
        emit RewardMinted(msg.sender, newTokenId);
    }

    // Helper function to convert uint256 to string
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    // Function to check if a user has completed the quiz
    function hasUserCompletedQuiz(address user) public view returns (bool) {
        return hasCompletedQuiz[user];
    }

    // Function to get user's score
    function getUserScore(address user) public view returns (uint256) {
        return userScores[user];
    }
} 