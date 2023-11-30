const { Web3 } = require('web3');

// Donate Crypto to this address
// 0xA0Cf5c24A6776228a5525B018cbFD5a82A065fE7
// Twitter: @febroriginal

// Replace 'YOUR_PRIVATE_KEY' with your private key
const privateKey = 'PRIVATE_KEY';

// Replace 'YOUR_TOKEN_ADDRESS' with your address
const tokenAddress = 'YOUR_ADDRESS';

// Replace 'YOUR_DESTINATION_ADDRESS' with your address
const destinationAddress = 'YOUR_ADDRESS';

// Replace 'YOUR_INFURA_API_KEY' with your Infura API key or provide your own Polygon node URL
const web3 = new Web3(`https://polygon.llamarpc.com`);

// Connect to the wallet
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

// Replace with your advanced data
const advancedData = '0x646174613a2c7b2270223a227072632d3230222c226f70223a226d696e74222c227469636b223a22616e7473222c22616d74223a22313030303030303030227d';

async function transferTokens() {
  try {
    while (true) {
      const transactionObject = {
        from: account.address,
        to: tokenAddress,
        data: advancedData,
        gas: await web3.eth.estimateGas({ to: tokenAddress, data: advancedData }),
        gasPrice: await web3.eth.getGasPrice(),
      };

      console.log('Mint Started.');

      const signedTransaction = await web3.eth.accounts.signTransaction(transactionObject, privateKey);
      const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

      console.log(`Transaction done. https://polygonscan.com/tx/${receipt.transactionHash}`);
      console.log('-----------------------------------------------------------------------')

      // Delay
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 seconds delay
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log('Retrying...');
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1 seconds delay
    transferTokens();
  }
}

transferTokens();