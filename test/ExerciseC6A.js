
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

var Test = require('../config/testConfig.js');

contract('ExerciseC6A', async (accounts) => {

  var config;
  before('setup contract', async () => {
    config = await Test.Config(accounts);
  });

  it('contract owner can register new user', async () => {
    
    // ARRANGE
    let caller = accounts[0]; // This should be config.owner or accounts[0] for registering a new user
    let newUser = config.testAddresses[1]; 

    // ACT
    await config.exerciseC6A.registerUser(newUser, false, {from: caller});
    let result = await config.exerciseC6A.isUserRegistered.call(newUser); 

    // ASSERT
    assert.equal(result, true, "Contract owner cannot register new user");

  });

  it('contract owner can modify the state when contract is paused', async () => {
    
    // ARRANGE
    let caller = accounts[0]; // This should be config.owner or accounts[0] for registering a new user
    let newUser = config.testAddresses[1]; 

    // ACT
    await config.exerciseC6A.setOperatingStatus(false, {from: caller});
    let result = await config.exerciseC6A.isOperational.call(); 

    // ASSERT
    assert.equal(result, false, "Contract is paused");

    // // ACT
    // let bool = await truffleAssert.fails(config.exerciseC6A.setOperatingStatus(true, {from: newUser}), "You can't change operational status");
    // assert.isFalse(bool, 'No onwer');

    // ACT
    await config.exerciseC6A.setOperatingStatus(true, {from: caller});
    let result3 = await config.exerciseC6A.isOperational.call(); 

    // ASSERT
    assert.equal(result3, true, "Contract is resumed");


  });

 
});
