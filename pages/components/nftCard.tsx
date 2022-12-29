export const NFTCard = ({ nft }: any) => {
  console.log(nft);
  return (
    <div className="flex flex-col ">
      <div className="rounded-md">
        <img
          className="object-cover h-128 w-full rounded-t-md"
          src={nft.media[0].gateway}
        ></img>
      </div>
      <div className="flex flex-col y-gap-2 px-2 py-3 text-gray-600 rounded-b-md h-110 ">
        <div className="">
          <h2 className="text-xl text-gray-800">{nft.title}</h2>
          <p className="text-gray-600">
            Id: {nft.id.tokenId.substr(nft.id.tokenId.length - 5)}
          </p>
          <p className="text-gray-600">
            Collection Address: {nft.contract.address}
          </p>
        </div>

        <div className="flex-grow mt-2">
          <p className="text-gray-600">{nft.description}</p>
          <p className="text-gray-600">
            {nft.metadata?.attributes?.length &&
              nft.metadata?.attributes.map((data: any) => {
                return (
                  <div>
                    <p className="text-gray-600">
                      {data['trait_type']}: {data.value}
                    </p>
                  </div>
                );
              })}
          </p>
        </div>
      </div>
    </div>
  );
};
