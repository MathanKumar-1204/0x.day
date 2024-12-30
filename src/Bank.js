import React, { useState } from "react";
import Web3 from "web3";

const App = () => {
  const [sender, setSender] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState("");

  const web3 = new Web3("http://127.0.0.1:7545"); // Connect to Ganache

  const transferFunds = async () => {
    if (!sender || !privateKey || !recipient || !amount) {
      alert("Please fill in all fields!");
      return;
    }
  
    try {
      const nonce = await web3.eth.getTransactionCount(sender, "latest"); // Get the transaction count (nonce)
  
      const tx = {
        from: sender,
        to: recipient,
        value: web3.utils.toWei(amount, "ether"),
        gas: 21000, // Standard gas limit for ETH transfers
        gasPrice: web3.utils.toWei("20", "gwei"), // Set gas price (20 gwei)
        nonce: nonce,
      };
  
      // Sign the transaction
      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  
      // Send the signed transaction
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      setTransactionHash(receipt.transactionHash);
  
      alert("Transaction successful!");
    } catch (error) {
      console.error("Error in transaction:", error);
      alert("Transaction failed!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bank Transfer DApp (No MetaMask)</h1>
      <input
        type="text"
        placeholder="Sender Address"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
        style={{ marginBottom: "10px", display: "block" }}
      />
      <input
        type="text"
        placeholder="Sender Private Key"
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
        style={{ marginBottom: "10px", display: "block" }}
      />
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        style={{ marginBottom: "10px", display: "block" }}
      />
      <input
        type="number"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ marginBottom: "20px", display: "block" }}
      />
      <button onClick={transferFunds} style={{ marginBottom: "20px" }}>
        Transfer Funds
      </button>
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
    </div>
  );
};

export default App;