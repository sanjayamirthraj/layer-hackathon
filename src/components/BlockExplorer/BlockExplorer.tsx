import React from "react";
import { Card } from "../Card/Card";
import FastExitRate from "../FastExitRate/FastExitRate";

interface Block {
  height: number;
  hash: string;
  timestamp: string;
  transactions: number;
  proposer: string;
  gasUsed: string;
  gasLimit: string;
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

const BlockExplorer: React.FC<BlockExplorerProps> = ({ blocks, reliabilityScore = 100, task = [] }) => {
  const fastExitRate = reliabilityScore / 100;

  return (
    <div>
      <div className="mb-6">
        <FastExitRate rate={fastExitRate} />
      </div>
      <div className="space-y-6">
        {/* Visual Block Explorer */}
        <Card>
          <div className="p-4">
            <h2 className="text-xl font-bold text-text-primary mb-4">Latest Blocks</h2>
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {blocks.map((block, index) => (
                <div
                  key={block.hash}
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
                        {task[index] ? new Date(task[index].addedTime).toLocaleTimeString() : '-'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Task Data Table */}
        <Card>
          <div className="p-4">
            <h2 className="text-xl font-bold text-text-primary mb-4">Task Details</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-text-tertiary text-sm border-b border-border-primary">
                    <th className="pb-2 text-left">ID</th>
                    <th className="pb-2 text-left">Status</th>
                    <th className="pb-2 text-left">Added Time</th>
                    <th className="pb-2 text-left">Finish Time</th>
                    <th className="pb-2 text-left">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {task.map((taskItem) => (
                    <tr
                      key={taskItem.id}
                      className="border-b border-border-primary hover:bg-background-interactive-hover"
                    >
                      <td className="py-3 text-text-primary">{taskItem.id}</td>
                      <td className="py-3 text-text-brand">{taskItem.status}</td>
                      <td className="py-3 text-text-secondary">{taskItem.addedTime}</td>
                      <td className="py-3 text-text-secondary">{taskItem.finishTime || "-"}</td>
                      <td className="py-3 text-text-secondary">{taskItem.json}</td>
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