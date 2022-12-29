import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
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
      // const foo = await fetch(
      //   nfts.ownedNfts[1].tokenUri.raw,
      //   requestOptions
      // ).then((data) => {
      //   console.warn(
      //     data.json().then((data) => {
      //       setUrl(data.image);
      //       console.warn(data);
      //     })
      //   );
      // });
      console.log('nfts:', nfts);
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
      <div className="grid">
        <div className="flex">
          <div className="grid justify-items-center bg-yellow-400 border-double border-4 border-purple-300 w-1/3">
            <h1>Search NFTs</h1>
            <br />
            <input
              onChange={(e) => {
                setWalletAddress(e.target.value);
              }}
              value={walletAddress}
              type={'text'}
              placeholder="Add your wallet address"
            ></input>
            <br />
            <input
              onChange={(e) => {
                setCollectionAddress(e.target.value);
              }}
              value={collectionAddress}
              type={'text'}
              placeholder="Add the collection address"
            ></input>
            <br />
            <label className="text-gray-600 ">
              <input
                onChange={(e) => {
                  setFetchForCollection(e.target.checked);
                }}
                checked={fetchForCollection}
                type={'checkbox'}
                className="mr-2"
              ></input>
              Fetch for collection
            </label>
            <br />
            <button
              className={'disabled:bg-slate-500 text-white bg-blue-400 p-5'}
              onClick={() => {
                fetchForCollection ? fetchNFTsForCollection() : fetchNFTs();
              }}
            >
              Let's go!{' '}
            </button>
            <br />
          </div>
          <div
            onClick={() => {
              clear();
            }}
            className="grid justify-items-center cursor-pointer bg-blue-400 border-double border-4 border-purple-300 w-1/3"
          >
            <div className="flex items-center disabled:bg-slate-500 text-white ">
              Clear
            </div>
          </div>
          <div className="grid justify-items-center bg-purple-300 border-double border-4 border-purple-300 w-1/3">
            <h1>Mint NFTs</h1>
            <NFTMint></NFTMint>
          </div>
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
          {fetching && (
            <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <h1>Loading...</h1>
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
