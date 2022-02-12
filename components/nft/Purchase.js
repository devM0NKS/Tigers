import { useEffect, useState } from 'react'

import { HiTag } from 'react-icons/hi'
import { IoMdWallet } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast'

const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
}

const MakeOffer = ({ isListed, selectedNft, listings, marketPlaceModule }) => {
  const [selectedMarketNft, setSelectedMarketNft] = useState()
  const [value, setValue] = useState('')
  const [enableButton, setEnableButton] = useState(false)

  useEffect(() => {
    if (!listings || isListed === 'false') return
    ;(async () => {
      setSelectedMarketNft(
        listings.find((marketNft) => marketNft.asset?.id === selectedNft.id)
      )
    })()
  }, [selectedNft, listings, isListed])
  console.log('SELCTED NFT= ', selectedMarketNft)
  useEffect(() => {
    if (!selectedMarketNft || !selectedNft) return

    setEnableButton(true)
  }, [selectedMarketNft, selectedNft])

  const confirmPurchase = (toastHandler = toast) =>
    toastHandler.success(`Bid Placed successfully!`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })

  const buyItem = async (
    listingId = selectedMarketNft.id,
    quantityDesired = 1,
    module = marketPlaceModule
  ) => {
    console.log(listingId, quantityDesired, module, 'david')
    // yo RAZA lets goooo!!!
    //yo Qazi, ok
    // sure okay about to run it...
    // just clicked buy now...
    // still error
    // where can i see the contract address of the marketplace module
    // in [nftId.js]

    await module
      .makeAuctionListingBid({
        listingId: listingId,
        pricePerToken: value,
      })
      .catch((error) => console.error(error))

    //makeAuctionListingBid{ listingId: BigNumberish;pricePerToken: BigNumberish;}
    confirmPurchase()
  }

  const getBider = async (
    listingId = selectedMarketNft.id,
    module = marketPlaceModule
  ) => {
    console.log(listingId, module, 'david')

    await module.closeAuctionListing(listingId)
    await module
      .getAuctionWinner(listingId)
      .then((auctionWinner) => console.log('ACCUTON WINNER: ', auctionWinner))
      .catch((err) => console.error(err))
  }

  return (
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster position="bottom-left" reverseOrder={false} />
      {isListed === 'true' &&
      parseInt(selectedMarketNft?.endTimeInEpochSeconds._hex, 16) -
        Math.floor(new Date().getTime() / 1000) >=
        0 ? (
        <>
          <div>
            <p>
              Time left:{' '}
              {parseInt(selectedMarketNft?.endTimeInEpochSeconds._hex, 16) -
                Math.floor(new Date().getTime() / 1000)}{' '}
              sec
            </p>
          </div>
          <div
            className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
            onClick={() => getBider()}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>Bid Now</div>
          </div>
          <div
            className={`${style.button} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
          >
            <HiTag className={style.buttonIcon} />
            <div
              className={style.buttonText}
              onClick={() => {
                enableButton ? buyItem(selectedMarketNft.id, 1) : null
              }}
            >
              Make Offer
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </>
      ) : (
        <div
          className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
          onClick={() => getBider()}
        >
          <IoMdWallet className={style.buttonIcon} />
          <div className={style.buttonText}>List Item</div>
        </div>
      )}
    </div>
  )
}

export default MakeOffer
