import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import FactorCart from "../completion-of-information/FactorCart";

// Actions
import { clear } from "../redux/cart/cartAction";

// Functions
import { convertToFa } from "../helper/functions";

// Icons
import {
  trashDesktopIcon,
} from "../../icons/shopCartIcons";
import { closeIcon } from "../../icons/mobileMenuIcons";
import {
  tickIcon,
  tickDesktopIcon,
} from "../../icons/completionOfInformationIcon";

// Styles
export const containerStyle = "container max-w-[1224px] mx-auto ";
const dialogBgStyle = "fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm";
const dialogDivStyle =
  "flex min-h-full items-center justify-center p-4 text-center";
const dialogPanelStyle =
  "w-full mx-1 transform overflow-hidden rounded-lg bg-white align-middle shadow-xl transition-all md:w-[392px]";
const dialogTitleStyle =
  "relative flex items-center justify-center font-medium bg-[#F9F9F9] px-6 py-[17px] mb-4 md:text-xl md:font-semibold md:py-[21px] md:mb-8";
const dialogCloseButtonStyle = "text-[#717171] absolute left-6";
const dialogPStyle = "text-center text-sm text-[#353535] md:text-base";
const dialogButtonDivStyle =
  "flex items-center justify-center gap-x-5 mb-4 md:mb-6 text-sm md:font-semibold md:text-base";
const dialogButtonStyle = "rounded border px-11 py-[5px] md:py-[7px]";
const mainDivStyle =
  "border border-[#CBCBCB] rounded-lg mb-10 p-6 text-[#353535] flex flex-col";
const cartDivStyle =
  "hidden lg:block [&>*:nth-child(odd)]:bg-[#F9F9F9] [&>*:nth-child(even)]:bg-[#EDEDED] h-[187px] overflow-scroll mb-3";
const settlementCardStyle = "flex flex-col gap-y-3";
const settlementCardCartStyle =
  "hidden lg:flex items-center justify-between border-b border-[#CBCBCB] pb-3 mb-3";
const settlementCardPriceDivStyle = "flex items-center gap-x-1 text-[#717171]";
const settlementCardDiscountStyle =
  "flex items-center justify-between pb-3 border-b border-[#CBCBCB] text-[15px] lg:py-3 lg:border-y";
const shippingCostStyle =
  "border-b border-[#CBCBCB] pb-3 flex  flex-col gap-y-2";
const shippingCostTitleStyle = "flex items-center justify-between text-[15px]";
const payableStyle =
  "flex items-center justify-between text-[15px] md:text-lg md:my-2";
const payableDivStyle =
  "text-[#417F56] flex items-center gap-x-1 font-medium md:text-lg";
const settlementCardButtonStyle =
  "bg-[#417F56] text-white rounded py-2 text-xs font-medium flex items-center justify-center gap-x-1 md:text-base";

const PaymentFactor = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cartState);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className={containerStyle}>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={dialogBgStyle} />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className={dialogDivStyle}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={dialogPanelStyle}>
                  <Dialog.Title className={dialogTitleStyle}>
                    <span>حذف محصولات</span>
                    <button
                      onClick={closeModal}
                      className={dialogCloseButtonStyle}
                    >
                      {closeIcon}
                    </button>
                  </Dialog.Title>

                  <div className="mb-[34px]">
                    <p className={dialogPStyle}>
                      همه محصولات سبد خرید شما حذف شود؟
                    </p>
                  </div>

                  <div className={dialogButtonDivStyle}>
                    <button
                      onClick={closeModal}
                      className={`${dialogButtonStyle} text-[#417F56] border-[#417F56]`}
                    >
                      بازگشت
                    </button>
                    <button
                      onClick={() => {
                        dispatch(clear());
                        closeModal();
                      }}
                      className={`${dialogButtonStyle} text-[#C30000] border-[#FFF2F2] bg-[#FFF2F2]`}
                    >
                      حذف
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div className={state.itemsCounter > 0 ? mainDivStyle : ""}>
        <div className={settlementCardCartStyle}>
          <div className={`${settlementCardPriceDivStyle} !text-[#353535]`}>
            <span>سبد خرید</span>
            <span className="text-sm">({convertToFa(state.itemsCounter)})</span>
          </div>
          <button
            onClick={() => {
              if (state.itemsCounter > 0) openModal();
            }}
            className={
              state.itemsCounter > 0 ? "text-[#353535]" : "text-[#CBCBCB]"
            }
          >
            {trashDesktopIcon}
          </button>
        </div>
        <div className={state.itemsCounter > 0 ? cartDivStyle : ""}>
          {state.selectedItems.map((item) => (
            <FactorCart key={item.id} data={item} />
          ))}
        </div>

        {state.itemsCounter > 0 && (
          <div className={settlementCardStyle}>
            <div className={settlementCardDiscountStyle}>
              <span>تخفیف محصولات</span>
              <div className={settlementCardPriceDivStyle}>
                <span>{convertToFa(state.discount)}</span>
                <span>تومان</span>
              </div>
            </div>

            <div className={shippingCostStyle}>
              <div className={shippingCostTitleStyle}>
                <span>هزینه ارسال</span>
                <div className={settlementCardPriceDivStyle}>
                  <span>۳۹,۰۰۰</span>
                  <span>تومان</span>
                </div>
              </div>
            </div>

            <div className={payableStyle}>
              <span>مبلغ قابل پرداخت</span>
              <div className={payableDivStyle}>
                <span>{convertToFa(state.total + 39000)}</span>
                <span>تومان</span>
              </div>
            </div>

            <Link to="/payment" className={settlementCardButtonStyle}>
              <span className="md:hidden">{tickIcon}</span>
              <span className="hidden md:block">{tickDesktopIcon}</span>
              <span>ثبت سفارش</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentFactor;
