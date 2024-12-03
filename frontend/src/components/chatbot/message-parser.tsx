import React from "react";

type Props = {
  children: React.ReactElement;
  actions: {
    handleGotIt: () => void;
    handleUserInput: () => void;
  };
};

const MessageParser = ({ children }: Props) => {
  const parse = (message: string) => {
    console.log(message);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;
