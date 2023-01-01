export const NFTCard = ({ nft }: any) => {
  console.log(nft);
  return (
    <div className="rounded overflow-hidden shadow-lg">
      <img className="w-full" src={nft.media[0].gateway}></img>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-red-800">{nft.title}</div>
        <div className="font-bold text-base mb-2 text-gray-700">
          {nft.description}
        </div>
        <p className="text-gray-700 text-base">
          Id: {nft.id.tokenId.substr(nft.id.tokenId.length - 5)}
        </p>
        <p className="text-gray-700 text-base">
          Collection Address: {nft.contract.address}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {nft.metadata?.attributes?.length &&
          nft.metadata?.attributes.map((data: any) => {
            return (
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {data['trait_type']}: {data.value}
              </span>
            );
          })}
      </div>
    </div>
  );
};
