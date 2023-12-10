"use client";

import CountUp from "react-countup";

const CountUpValue = ({
  value,
  isCurrency = false,
}: {
  value: number;
  isCurrency?: boolean;
}) => {
  return <CountUp end={value} prefix={isCurrency ? "&#8377; " : ""} />;
};

export default CountUpValue;
