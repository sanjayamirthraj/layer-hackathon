"use client";
import BlockExplorer from "@/components/BlockExplorer/BlockExplorer";

export default function Home() {
  //Example blocks for the block explorer; will replace with AVS data
  const mockBlocks = [
    {
      height: 1234567,
      hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      timestamp: "2024-03-21T14:32:15Z",
      transactions: 150,
      proposer: "0xabcdef1234567890abcdef1234567890abcdef1234",
      gasUsed: "1,234,567",
      gasLimit: "2,000,000",
    },
   
  ];

  return (
    <main className="container mx-auto p-6">
      <BlockExplorer blocks={mockBlocks} />
    </main>
  );
}