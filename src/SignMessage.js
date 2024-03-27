import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Axios from "axios";

const polygonChainId = "0x89"; // Polygon Mainnet'in zincir ID'si

const addPolygonNetwork = async () => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: polygonChainId,
          chainName: "Polygon Mainnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          rpcUrls: ["https://rpc-mainnet.maticvigil.com/"],
          blockExplorerUrls: ["https://polygonscan.com/"],
        },
      ],
    });
  } catch (err) {
    console.error("Error adding Polygon network:", err);
  }
};

const signMessage = async ({ setError, message }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    return {
      message,
      signature,
      address,
    };
  } catch (err) {
    setError(err.message);
  }
};

export default function SignMessage() {
  const [signatures, setSignatures] = useState([]);
  const [error, setError] = useState("");

  const register = async (uuid, walletAddress) => {
    try {
      const json = JSON.stringify({
        matchId: uuid,
        userAddress: walletAddress,
      });
      await Axios.post("https://wossk8w.84.247.185.219.sslip.io/user", json, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.error("Error during API call:", e);
    }
  };

  const handleSign = async (uuid) => {
    setError("");
    const sig = await signMessage({
      setError,
      message: uuid,
    });
    if (sig) {
      setSignatures([...signatures, sig]);
      register(uuid, sig.address);
    }
  };

  useEffect(() => {
    addPolygonNetwork();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uuid = urlParams.get("id");
    if (uuid) {
      handleSign(uuid);
    }
  }, []);

  return (
    <div className="sign-message">
      {error && <p className="error-message">{error}</p>}
      {signatures.map((sig, idx) => (
        <div key={idx} className="signature-details">
          <p>Thank you for signing. You may return to the game. Enjoy!</p>
          <p>Message: {sig.message}</p>
          <p>Signer: {sig.address}</p>
          <p>Proof:</p>
          <textarea
            readOnly
            className="signature-textarea"
            value={sig.signature}
          />
        </div>
      ))}
    </div>
  );
}
