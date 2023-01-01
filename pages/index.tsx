import type { NextPage } from 'next';
import { useState } from 'react';
import { Loading } from './components/loading';
import { NFTCard } from './components/nftCard';
import { NFTMint } from './components/nftMint';

const Home: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [collectionAddress, setCollectionAddress] = useState('');
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const [fetching, setFetching] = useState(false);

  const api_key = 'ck6bTPdPRI113MJyOwGH-WwIPYbpXBeW';
  const goerli = 'https://eth-goerli.g.alchemy.com/v2';

  const fetchNFTs = async () => {
    clear();
    let nfts;
    console.log('fetching nfts');

    const baseURL = `${goerli}/${api_key}/getNFTs/`;
    var requestOptions = {
      method: 'GET',
    };

    if (!collectionAddress.length) {
      const fetchURL = `${baseURL}?owner=${walletAddress}`;

      setFetching(true);
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
      setFetching(false);
    } else {
      console.log('fetching nfts for collection owned by address');
      const fetchURL = `${baseURL}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`;
      setFetching(true);
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
      setFetching(false);
    }

    if (nfts) {
      setNFTs(nfts.ownedNfts);
    }
  };

  const fetchNFTsForCollection = async () => {
    clear();
    if (collectionAddress.length) {
      var requestOptions = {
        method: 'GET',
      };
      const baseURL = `${goerli}/${api_key}/getNFTsForCollection/`;
      setFetching(true);
      const fetchURL = `${baseURL}?contractAddress=${collectionAddress}&withMetadata=${'true'}`;
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      setFetching(false);
      if (nfts) {
        console.log('NFTs in collection:', nfts);
        setNFTs(nfts.nfts);
      }
    }
  };

  const clear = () => {
    setFetchForCollection(false);
    setWalletAddress('');
    setCollectionAddress('');
    setNFTs([]);
    setFetching(false);
  };

  return (
    <div className="grid">
      <div className="flex">
        <div className="grid justify-items-center bg-gradient-to-br from-purple-600 to-orange-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-1/3">
          <div className="grid-item">
            <h1>Search NFTs</h1>
            <br />
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Wallet Address:
              </label>
              <input
                onChange={(e) => {
                  setWalletAddress(e.target.value);
                }}
                value={walletAddress}
                type="text"
                id="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Collection Address:
              </label>
              <input
                onChange={(e) => {
                  setCollectionAddress(e.target.value);
                }}
                value={collectionAddress}
                type="text"
                id="uri"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="flex items-center">
              <input
                onChange={(e) => {
                  setFetchForCollection(e.target.checked);
                }}
                checked={fetchForCollection}
                id="checked-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Fetch For Collection
              </label>
            </div>
            <br />
            <button
              type="button"
              onClick={() => {
                fetchForCollection ? fetchNFTsForCollection() : fetchNFTs();
              }}
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Go!
              <svg
                aria-hidden="true"
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div
          onClick={() => {
            clear();
          }}
          className="grid justify-items-center cursor-pointer bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 w-1/3"
        >
          <div className="flex items-center disabled:bg-slate-500 text-white ">
            Clear
          </div>
        </div>
        <div className="grid justify-items-center bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-1/3">
          <h1>Mint NFTs</h1>
          <br />
          <NFTMint></NFTMint>
        </div>
      </div>
      {NFTs.length > 0 ? (
        <div className="grid grid-cols-3">
          {NFTs.map((nft) => {
            return (
              <div className="border-double border-4 border-rose-200">
                <NFTCard nft={nft}></NFTCard>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <br />
          <br />
          <br />
          <Loading fetching={fetching}></Loading>
        </div>
      )}
    </div>
  );
};

export default Home;
