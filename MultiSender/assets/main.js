const contractAddress = '0x50D50aE1bDeDe0D67cA3d5102233923527fC8B29';
const ABI = '[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_decimals","type":"uint256"},{"internalType":"address[]","name":"airdropWallets","type":"address[]"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"multiSendSameAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_decimals","type":"uint256"},{"internalType":"address[]","name":"airdropWallets","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"multiSendSpecificAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_to","type":"address"}],"name":"transferForeignToken","outputs":[{"internalType":"bool","name":"_sent","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawStuckETH","outputs":[],"stateMutability":"nonpayable","type":"function"}]';

var Web3Modal = window.Web3Modal.default;
var WalletConnectProvider = window.WalletConnectProvider.default;
var Fortmatic = window.Fortmatic;
var evmChains = window.evmChains;

document.addEventListener("DOMContentLoaded", function() {
    const web3Modal = new Web3Modal({
        network: "mainnet", // Replace with your desired network
        cacheProvider: true,
        providerOptions: {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: "YOUR_INFURA_PROJECT_ID", // Replace with your Infura Project ID
                },
            },
            // Add other providers here if needed
        },
    });

    const connectButton = document.getElementById("connectButton");
    const networkDisplay = document.getElementById("networkDisplay");

    connectButton.addEventListener("click", async () => {
        try {
            const provider = await web3Modal.connect();
            const web3 = new Web3(provider);

            // Retrieve the connected wallet address
            const accounts = await web3.eth.getAccounts();
            const walletAddress = accounts[0];

            // Update the button text
            connectButton.textContent = `Connected ${walletAddress.substring(0, 6)}...${walletAddress.substring(
        38
      )}`;

            // Retrieve the network ID
            const networkId = await web3.eth.net.getId();

            // Check if the connected network is Ethereum Mainnet (ID: 1)
            if (networkId !== 1) {
                document.getElementById("networkWarning").textContent =
                    "Warning: Please connect to Ethereum Mainnet.";
            } else {
                document.getElementById("networkWarning").textContent = "";
            }

            // Update the network display
            networkDisplay.textContent = `Connected to ${getNetworkName(networkId)}`;
        } catch (error) {
            console.error(error);
        }
    });

    // Function to get network name based on network ID
    function getNetworkName(networkId) {
        switch (networkId) {
            case 1:
                return "Ethereum Mainnet";
            case 3:
                return "Ropsten Testnet";
            case 4:
                return "Rinkeby Testnet";
            case 5:
                return "Goerli Testnet";
            case 42:
                return "Kovan Testnet";
            default:
                return "Unknown Network";
        }
    }

    // Handle multi-send specific amount button click
    const multiSendSpecificAmountButton = document.getElementById("multiSendSpecificAmountButton");
    multiSendSpecificAmountButton.addEventListener("click", async () => {
        try {
            // Retrieve form input values
            const tokenAddress = document.getElementById("tokenAddress").value;
            const decimals = document.getElementById("decimals").value;
            const addresses = document.getElementById("addresses").value.split(",").map((address) => address.trim());
            const amounts = document.getElementById("amounts").value.split(",").map((amount) => amount.trim());

            // Check if the connected network is Ethereum Mainnet (ID: 1)
            const networkId = await ethereum.request({
                method: "net_version"
            });
            if (networkId !== "1") {
                alert("Please connect to Ethereum Mainnet to perform the airdrop.");
                return;
            }

            // Check if MetaMask is installed
            if (typeof ethereum === "undefined") {
                alert("Please install MetaMask to use this dApp.");
                return;
            }

            // Check if user has approved the token transfer
            const approved = await checkApproval(tokenAddress);
            if (!approved) {
                alert("Please approve the token transfer before performing the airdrop.");
                return;
            }

            // Perform the multi-send specific amount
            await multiSendSpecificAmount(tokenAddress, contractAddress, decimals, addresses, amounts);

            // Reset the form
            document.getElementById("airdropForm").reset();
        } catch (error) {
            console.error(error);
        }
    });

    // Handle multi-send same amount button click
    const multiSendSameAmountButton = document.getElementById("multiSendSameAmountButton");
    multiSendSameAmountButton.addEventListener("click", async () => {
        try {
            // Retrieve form input values
            const tokenAddress = document.getElementById("tokenAddress").value;
            const decimals = document.getElementById("decimals").value;
            const addresses = document.getElementById("addresses").value.split(",").map((address) => address.trim());
            const amount = document.getElementById("amounts").value.trim();

            // Check if the connected network is Ethereum Mainnet (ID: 1)
            const networkId = await ethereum.request({
                method: "net_version"
            });
            if (networkId !== "1") {
                alert("Please connect to Ethereum Mainnet to perform the airdrop.");
                return;
            }

            // Check if MetaMask is installed
            if (typeof ethereum === "undefined") {
                alert("Please install MetaMask to use this dApp.");
                return;
            }

            // Check if user has approved the token transfer
            const approved = await checkApproval(tokenAddress);
            if (!approved) {
                alert("Please approve the token transfer before performing the airdrop.");
                return;
            }

            // Perform the multi-send same amount
            await multiSendSameAmount(tokenAddress, contractAddress, decimals, addresses, amount);

            // Reset the form
            document.getElementById("airdropForm").reset();
        } catch (error) {
            console.error(error);
        }
    });

    // Check if the token transfer is approved
    async function checkApproval(tokenAddress) {
        const approvedAmount = await ethereum.request({
            method: "eth_call",
            params: [{
                to: tokenAddress,
                data: "0x095ea7b30000000000000000000000000000000000000000000000000000000000000003",
            }, ],
        });

        return approvedAmount !== "0x";
    }

    // Perform the multi-send specific amount
    async function multiSendSpecificAmount(tokenAddress, contractAddress, decimals, addresses, amounts) {
        const contract = new ethereum.Contract(ABI, contractAddress);

        for (let i = 0; i < addresses.length; i++) {
            const wallet = addresses[i];
            const amount = amounts[i];

            await contract.methods.transfer(wallet, amount * 10 ** decimals).send({
                from: ethereum.selectedAddress
            });
        }

        alert("Multi-send specific amount completed successfully!");
    }

    // Perform the multi-send same amount
    async function multiSendSameAmount(tokenAddress, contractAddress, decimals, addresses, amount) {
        const contract = new ethereum.Contract(ABI, contractAddress);

        for (let i = 0; i < addresses.length; i++) {
            const wallet = addresses[i];

            await contract.methods.transfer(wallet, amount * 10 ** decimals).send({
                from: ethereum.selectedAddress
            });
        }

        alert("Multi-send same amount completed successfully!");
    }

    $(".connectBtn").on("click", function() {
        if (walletAddress === null) {
            $("#walletConnectModal").css("display", "block");
        } else {
            if (confirm("Would you like to disconnect from this dApp?")) {
                if (isMetaMask) {
                    metaMaskConnect.disconnect();
                } else {
                    walletConnect.disconnect();
                }
            }
        }
    });

    $("#modalWConnect").on("click", function() {
        walletConnect.initialise();
        walletConnect.connect();
        $("#walletConnectModal").css("display", "none");
    });

    $("#modalMMConnect").on("click", function() {
        metaMaskConnect.initialise().then(function() {
            metaMaskConnect.connect();
        });
        $("#walletConnectModal").css("display", "none");
    });

    $("#walletConnectModal").css("display", "block");
});