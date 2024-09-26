"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/Modal/Modal";

// Define a type for wallet keys
type WalletType = "keplr" | "leap";

// Define the wallet details with the WalletType keys
const walletDetails: Record<WalletType, { icon: string; name: string }> = {
  keplr: {
    icon: "https://raw.githubusercontent.com/WHELP-project/whelp-frontend/main/packages/ui/public/images/walletIcons/keplr.png",
    name: "Keplr",
  },
  leap: {
    icon: "https://raw.githubusercontent.com/WHELP-project/whelp-frontend/refs/heads/main/packages/ui/public/images/walletIcons/leap.png",
    name: "Leap",
  },
};

export function WalletModal({
  open,
  setOpen,
  onWalletClick,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onWalletClick: (wallet: WalletType) => Promise<void>;
}) {
  const [loadingWallet, setLoadingWallet] = useState<WalletType | null>(null);
  const [connectedWallet, setConnectedWallet] = useState<WalletType | null>(
    null
  );

  const handleWalletClick = async (wallet: WalletType) => {
    setLoadingWallet(wallet);
    try {
      await onWalletClick(wallet);
      setConnectedWallet(wallet);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    } finally {
      setLoadingWallet(null);
    }
  };

  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <ModalHeader>
        <h2 className="text-xl text-text-primary font-semibold">
          {connectedWallet ? "Wallet Connected" : "Connect Wallet"}
        </h2>
        {!connectedWallet && (
          <p className="text-text-secondary">
            Start by connecting with one of the wallets below.
          </p>
        )}
      </ModalHeader>
      <ModalBody>
        {!loadingWallet && !connectedWallet && (
          <div>
            {Object.keys(walletDetails).map((wallet) => (
              <button
                key={wallet}
                className="w-full flex items-center p-3 mb-3 border border-border-primary rounded-lg transition-transform transform hover:scale-105 hover:bg-background-interactive-hover"
                onClick={() => handleWalletClick(wallet as WalletType)} // Type assertion here
              >
                <img
                  className="mr-4 w-8 h-8"
                  alt={`${walletDetails[wallet as WalletType].name} icon`} // Type assertion here
                  src={walletDetails[wallet as WalletType].icon} // Type assertion here
                />
                <p className="text-lg text-text-primary">
                  {walletDetails[wallet as WalletType].name}
                </p>
              </button>
            ))}
          </div>
        )}
        {loadingWallet && !connectedWallet && (
          <div className="flex flex-col items-center justify-center">
            <motion.div className="relative w-20 h-20 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 border-4 border-transparent border-t-text-brand rounded-full"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ ease: "linear", duration: 1, repeat: Infinity }}
              />
              <img
                className="w-12 h-12"
                alt={`${walletDetails[loadingWallet].name} icon`}
                src={walletDetails[loadingWallet].icon}
              />
            </motion.div>
            <p className="mt-4 text-text-secondary">
              Connecting to {walletDetails[loadingWallet].name}...
            </p>
          </div>
        )}
        {connectedWallet && (
          <div className="flex flex-col items-center justify-center">
            <motion.div
              className="relative w-20 h-20 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                className="w-12 h-12"
                alt={`${walletDetails[connectedWallet].name} icon`}
                src={walletDetails[connectedWallet].icon}
              />
            </motion.div>
            <p className="mt-4 text-text-interactive-valid">
              Connected to {walletDetails[connectedWallet].name}!
            </p>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <button
          className="w-full"
          onClick={() => setOpen(false)}
          disabled={loadingWallet !== null}
        >
          {connectedWallet ? "Close" : "Cancel"}
        </button>
      </ModalFooter>
    </Modal>
  );
}
