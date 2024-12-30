import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Transaction = () => {
  const [sender, setSender] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [user, setUser] = useState(null);
  const web3 = new Web3("http://127.0.0.1:7545"); // Connect to Ganache

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                setUser(authUser)
            } else {
               setUser(null);
            }
        });
    return () => unsubscribe();
    }, []);

  const transferFunds = async () => {
    if (!sender || !privateKey || !recipient || !amount) {
      alert("Please fill in all fields!");
      return;
    }

    try {
        if(!user){
             alert("Please log in before doing a transaction");
           return;
        }
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
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
        if (!receipt.transactionHash) {
             alert("Transaction failed: No transaction hash returned.");
             return;
            }

      setTransactionHash(receipt.transactionHash);

      // If transaction successful, update balance
      await updateBalance(user.uid, amount);
          alert("Transaction successful!");
    } catch (error) {
      console.error("Error in transaction:", error);
      alert("Transaction failed!");
    }
  };

  const updateBalance = async (userId, amount) => {
        try {
          const userDocRef = doc(db, "admin", userId);
          const userDoc = await getDoc(userDocRef);

           if (userDoc.exists()) {
            const currentBalance = parseFloat(userDoc.data().balance) || 0; // Parse to float, default to 0
            const newBalance = currentBalance - parseFloat(amount);

            await updateDoc(userDocRef, {
              balance: newBalance.toString(),
            });
            console.log("Balance updated successfully!");
          } else {
            console.log("User document not found for update");
          }
        } catch (error) {
            console.error("Error updating balance:", error);
            alert("Error updating balance: " + error.message);
        }
    };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Bank Transfer DApp
      </h1>
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <input
          type="text"
          placeholder="Sender Address"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Sender Private Key"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Amount (ETH)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={transferFunds}
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Transfer Funds
        </button>
        {transactionHash && (
          <p className="mt-4 text-sm text-green-600">
            Transaction Hash: {transactionHash}
          </p>
        )}
      </div>
    </div>
  );
};

export default Transaction;