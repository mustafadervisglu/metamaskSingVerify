import { ethers } from "ethers";
import "react-toastify/dist/ReactToastify.css";

const polygonChainId = "0x89"; // Polygon Mainnet'in zincir ID'si

export const addPolygonNetwork = async () => {
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

export const signMessage = async ({ setError, message }) => {
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
