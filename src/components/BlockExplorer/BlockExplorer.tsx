import React, { useEffect, useState } from "react";
import { Card } from "../Card/Card";
import FastExitRate from "../FastExitRate/FastExitRate";
import { ethers } from "ethers";

interface Block {
  height: number;
  hash: string;
  timestamp: string;
  transactions: number;
  proposer: string;
  gasUsed: string;
  gasLimit: string;
  score?: number;
  interestRate?: number;
}

interface Task {
  id: string;
  status: string;
  addedTime: string;
  finishTime: string | undefined;
  json: string;
}

interface BlockExplorerProps {
  blocks: Block[];
  reliabilityScore?: number;
  task?: Task[];
}

// Update provider creation
const INFURA_URL = `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
const provider = new ethers.JsonRpcProvider(INFURA_URL);

const BlockExplorer: React.FC<BlockExplorerProps> = ({ reliabilityScore = 100 }) => {
  // Initialize with empty array instead of placeholder block
  const [latestBlocks, setLatestBlocks] = useState<Block[]>([]);
  
  const fastExitRate = reliabilityScore / 100;

  useEffect(() => {
    const fetchLatestBlock = async () => {
      try {
        const blockNumber = await provider.getBlockNumber();
        console.log("Latest block number:", blockNumber);
        
        const block = await provider.getBlock(blockNumber);
        console.log("Block data:", block);
        
        if (!block) {
          console.log("No block data received");
          return;
        }

        const newBlock: Block = {
          height: block.number,
          hash: block.hash || '',
          timestamp: new Date(Number(block.timestamp) * 1000).toISOString(),
          transactions: block.transactions.length,
          proposer: block.miner || '',
          gasUsed: block.gasUsed.toString(),
          gasLimit: block.gasLimit.toString(),
          score: 0,
          interestRate: 0,
        };
        

        setLatestBlocks(prev => {
          if (prev[0]?.height !== newBlock.height) {
            const updated = [newBlock, ...prev];
            return updated.slice(0, 10);
          }
          return prev;
        });
      } catch (error) {
        console.error("Error fetching block:", error);
      }
    };

    fetchLatestBlock();
    const interval = setInterval(fetchLatestBlock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="mb-6">
        <FastExitRate rate={fastExitRate} />
      </div>
      <div className="space-y-6">
        <Card>
          <div className="p-4">
            <h2 className="text-xl font-bold text-text-primary mb-4">Latest Blocks</h2>
            <div className="relative">
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background-primary to-transparent pointer-events-none z-10" />
              <div className="flex overflow-x-auto space-x-4 pb-4 scroll-smooth scrollbar-thin scrollbar-thumb-border-interactive scrollbar-track-background-secondary">
                {latestBlocks.map((block, index) => (
                  <div
                    key={`${block.height}-${index}`}
                    className={`flex-shrink-0 w-48 p-4 rounded-lg border transition-colors ${
                      index === 0
                        ? "bg-background-brand bg-opacity-5 border-border-interactive-hover"
                        : "bg-background-secondary border-border-primary hover:bg-background-brand hover:bg-opacity-50"
                    } hover:bg-background-brand hover:bg-opacity-50`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-secondary">Block</span>
                      <span className="text-sm font-bold text-text-primary">
                        #{block.height}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-text-tertiary">Transactions</p>
                        <p className="text-sm text-text-primary">{block.transactions}</p>
                      </div>
                      <div>
                        <p className="text-xs text-text-tertiary">Time</p>
                        <p className="text-sm text-text-primary">
                          {new Date(block.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Block Details Table */}
        <Card>
          <div className="p-4">
            <h2 className="text-xl font-bold text-text-primary mb-4">Block Details</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-text-tertiary text-sm border-b border-border-primary">
                    <th className="pb-2 text-left">Block Number</th>
                    <th className="pb-2 text-left">Transactions</th>
                    <th className="pb-2 text-left">Timestamp</th>
                    <th className="pb-2 text-left">Score</th>
                    <th className="pb-2 text-left">Interest Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {latestBlocks.map((block) => (
                    <tr
                      key={block.height}
                      className="border-b border-border-primary hover:bg-background-interactive-hover"
                    >
                      <td className="py-3 text-text-primary">#{block.height}</td>
                      <td className="py-3 text-text-brand">{block.transactions}</td>
                      <td className="py-3 text-text-secondary">
                        {new Date(block.timestamp).toLocaleString()}
                      </td>
                      <td className="py-3 text-text-secondary">{block.score}</td>
                      <td className="py-3 text-text-secondary">{block.interestRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BlockExplorer;