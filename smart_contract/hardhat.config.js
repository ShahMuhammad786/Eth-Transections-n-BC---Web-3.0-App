//https://eth-goerli.alchemyapi.io/v2/92TdgOCgT-HRt4g4xSfL7PJ-FCND4rdZ

require('@nomiclabs/hardhat-waffle') //a plugin to build a smart contract test 

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.alchemyapi.io/v2/92TdgOCgT-HRt4g4xSfL7PJ-FCND4rdZ',
      accounts: ['598cad7482009735acce7ec69afcf681ee206a0f187dab79c9d87b5921b0f55e'] //accounts to fund this contract
    }
  }
}