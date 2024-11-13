"use client";
import BlockExplorer from "@/components/BlockExplorer/BlockExplorer";

export default function Home() {
  const mockBlocks = [
    {
      height: 1234567,
      hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      timestamp: "2024-03-21T14:32:15Z",
      transactions: 150,
      proposer: "0xabcdef1234567890abcdef1234567890abcdef1234",
      gasUsed: "1,234,567",
      gasLimit: "2,000,000",
    }];

  const mockBlock = Array(10).fill(mockBlocks[0]);

  const exampleRates = [8.62, 17.21, 13.96];
  const fastExitRate = exampleRates[Math.floor(Math.random() * exampleRates.length)];

  return (
    <main className="container mx-auto p-6">
      <BlockExplorer blocks={mockBlock} fastExitRate={fastExitRate} />
    </main>
  );
}