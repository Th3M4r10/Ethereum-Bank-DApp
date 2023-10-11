var ContractABI = [
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getbalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userAccount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

var ContractAddress = '0x33CbC71afE52481b04EA587eBD53fB2261B50b65'

var loginbutton = document.getElementById('connect_to_metamask')
var useraddress = document.getElementById('accountaddress')
var depositeinput = document.getElementById('depositeeth')
var depositebutton = document.getElementById('depositebutton')
var withdrawinput = document.getElementById('withdraweth')
var withdrawbutton = document.getElementById('withdrawbutton')
var getbalancebutton = document.getElementById('getbalance')
var balance = document.getElementById('balance')

var address, web3, myContract

document.addEventListener('DOMContentLoaded', async () => {
  if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!')

    web3 = new Web3(window.ethereum)
    console.log('web3 is loaded', web3)

    myContract = new web3.eth.Contract(ContractABI, ContractAddress)
    console.log('contract is loaded', myContract)

    loginbutton.addEventListener('click', async () => {
      // ethereum.request({ method: 'eth_requestAccounts' });

      var accounts = await ethereum.request({ method: 'eth_requestAccounts' }) // returns an array of conneccted accounts
      address = accounts[0]
      useraddress.innerText = address

      useraddress.classList.remove('d-none')
      loginbutton.classList.add('d-none')
      console.log(accounts)
      console.log(accounts[0])
    })

    ethereum.on('accountsChanged', async function (accounts) {
      // Time to reload your interface with accounts[0]!
      var accounts = await ethereum.request({ method: 'eth_requestAccounts' }) // returns an array of conneccted accounts
      address = accounts[0]
      useraddress.innerText = address
    })

    depositebutton.addEventListener('click', async () => {
      console.log(depositeinput.value, address)

      // depositeinput.value * 10 ** 18
      await myContract.methods
        .deposite()
        .send(
          { from: address, value: depositeinput.value * 10 ** 18 },
          function (err, res) {
            console.log(res)
          },
        )
    })

    withdrawbutton.addEventListener('click', () => {
      myContract.methods
        .withdraw(withdrawinput.value)
        .send({ from: address }, function (err, res) {
          console.log(res)
        })
    })

    getbalancebutton.addEventListener('click', () => {
      myContract.methods
        .getbalance()
        .call({ from: address }, function (err, res) {
          console.log(res)
          balance.innerText = res
        })
    })
  } else {
    alert('please install metamask !')
  }
})
