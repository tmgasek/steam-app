import React from "react";

type ButtonProps = {
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button>{children}</button>;
};
