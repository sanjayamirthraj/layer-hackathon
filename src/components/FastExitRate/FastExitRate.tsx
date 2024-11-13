import React from "react";
import { Card, CardBody } from "../Card/Card";

interface FastExitRateProps {
  rate: number;
}

const FastExitRate: React.FC<FastExitRateProps> = ({ rate }) => {
  // Determine status message based on rate thresholds
  const getStatusMessage = () => {
    if (rate < 10) {
      return "Low - Fast exit rate is lower than usual";
    } else if (rate > 15) {
      return "High - Fast exit rate is higher than usual";
    }
    return "Moderate - Fast exit rate at moderate levels";
  };

  // Calculate reliability score (example: inverse relationship with rate)
  const reliabilityScore = Math.max(0, 100 - (rate * 5));
  const getReliabilityMessage = () => {
    if (reliabilityScore >= 80) {
      return "Strong validator retention";
    } else if (reliabilityScore >= 50) {
      return "Average validator retention";
    }
    return "High validator turnover";
  };

  return (
    <Card>
      <CardBody>
        <div className="flex items-center gap-6">
          {/* Left side - Rate value in see-through card */}
          <div className="bg-background-primary bg-opacity-50 rounded-lg p-4 min-w-[120px] text-center">
            <div className="text-3xl font-bold text-text-primary mb-1">
              {rate.toFixed(1)}%
            </div>
            <div className="text-sm text-text-secondary">Fast Exit Rate</div>
          </div>

          {/* Right side - Status messages */}
          <div className="flex-1">
            <div className="mb-2">
              <div className="text-lg font-semibold text-text-primary mb-1">
                {getStatusMessage()}
              </div>
              <div className="text-sm text-text-secondary">
                Current fast exit rate indicates {getReliabilityMessage().toLowerCase()}
              </div>
            </div>
            
            {/* Reliability Score Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-text-secondary mb-1">
                <span>Reliability Score</span>
                <span>{reliabilityScore.toFixed(2)}%</span>
              </div>
              <div className="h-2 bg-background-interactive-hover rounded-full">
                <div 
                  className="h-full bg-background-brand rounded-full transition-all duration-300"
                  style={{ width: `${reliabilityScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default FastExitRate;