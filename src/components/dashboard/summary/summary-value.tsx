"use client";

import CountUp from "react-countup";

const SummaryValue = ({
  value,
  isCurrency = false,
}: {
  value: number;
  isCurrency?: boolean;
}) => {
  return <CountUp end={value} prefix={isCurrency ? "&#8377; " : ""} />;
};

export default SummaryValue;
