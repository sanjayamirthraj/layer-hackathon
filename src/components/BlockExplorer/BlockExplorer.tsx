import React from "react";
import { Card } from "../Card/Card";

interface Block {
  height: number;
  hash: string;
  timestamp: string;
  transactions: number;
  proposer: string;
  gasUsed: string;
  gasLimit: string;
}

interface BlockExplorerProps {
  blocks: Block[];
}

const BlockExplorer: React.FC<BlockExplorerProps> = ({ blocks }) => {
  return (
    <div className="space-y-6">
      {/* Visual Block Explorer */}
      <Card>
        <div className="p-4">
          <h2 className="text-xl font-bold text-text-primary mb-4">Latest Blocks</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {blocks.map((block) => (
              <div
                key={block.hash}
                className="flex-shrink-0 w-48 p-4 bg-background-secondary rounded-lg border border-border-primary hover:border-border-interactive-hover transition-colors"
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
      </Card>

      {/* Block Data Table */}
      <Card>
        <div className="p-4">
          <h2 className="text-xl font-bold text-text-primary mb-4">Block Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-text-tertiary text-sm border-b border-border-primary">
                  <th className="pb-2 text-left">Height</th>
                  <th className="pb-2 text-left">Hash</th>
                  <th className="pb-2 text-left">Time</th>
                  <th className="pb-2 text-left">Txs</th>
                  <th className="pb-2 text-left">Proposer</th>
                  <th className="pb-2 text-left">Gas Used/Limit</th>
                </tr>
              </thead>
              <tbody>
                {blocks.map((block) => (
                  <tr
                    key={block.hash}
                    className="border-b border-border-primary hover:bg-background-interactive-hover"
                  >
                    <td className="py-3 text-text-primary">{block.height}</td>
                    <td className="py-3 text-text-brand">
                      {`${block.hash.slice(0, 8)}...${block.hash.slice(-8)}`}
                    </td>
                    <td className="py-3 text-text-secondary">
                      {new Date(block.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 text-text-primary">{block.transactions}</td>
                    <td className="py-3 text-text-secondary">
                      {`${block.proposer.slice(0, 8)}...${block.proposer.slice(-8)}`}
                    </td>
                    <td className="py-3 text-text-secondary">
                      {`${block.gasUsed} / ${block.gasLimit}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BlockExplorer;