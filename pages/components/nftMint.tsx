import { ethers } from 'ethers';
import { useState } from 'react';

import { abi } from '../../constants/abi';

export const NFTMint = () => {
  const [url, setUrl] = useState('');
  const [address, setAddress] = useState('');

  async function connect() {
    if (typeof window.ethereum !== 'undefined') {
      ethereum.request({ method: 'eth_requestAccounts' });
    }
  }

  async function mint() {
    //address
    // contract ABI
    // function
    // node connection

    const contract = getContract();

    try {
      const transaction = await contract
        .safeMint(address, url, {
          value: ethers.utils.parseEther('0.001'),
        })
        .then((transaction: any) => {
          setAddress('');
          setUrl('');
          return transaction;
        });
      window
        .open(`https://goerli.etherscan.io/tx/${transaction?.hash}`, '_blank')
        ?.focus();
    } catch (error) {
      setError(error);
    }
  }
  function getContract() {
    const contractAddress = '0x20634594495A34F62d1833531c537C41288cc4AB';

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(); // gets the connected account
    const contract = new ethers.Contract(contractAddress, abi, signer);
    return contract;
  }

  function setError(error: any) {
    alert(JSON.stringify(error));
    console.log(error);
  }
  return (
    <div>
      <div className="grid-container">
        <div className="grid-item">
          <h2 id="usageFee">Usage Fee: 0.001 ETH</h2>
        </div>
        <br />
        <div className="grid-item">
          <label className="label">Receiver Address:</label>
          <input
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            value={address}
            type="text"
            id="address"
            name="address"
          />
          <br />
          <br />
          <label className="label">Meta Data URI:</label>
          <input
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            value={url}
            type="text"
            id="uri"
            name="uri"
            placeholder="IPFS url that leads to json object etc"
          />
          <br />
          <br />
          <div className="flex">
            <button
              id="connectButton"
              onClick={() => {
                connect();
              }}
              className="disabled:bg-slate-500 text-white bg-green-400 p-5"
            >
              Connect Wallet
            </button>
            <button
              className="disabled:bg-slate-500 text-white bg-red-400 p-5 grow"
              id="mintButton"
              onClick={() => {
                mint();
              }}
            >
              Mint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
