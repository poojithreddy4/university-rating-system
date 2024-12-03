import React from "react";
import { IMessageOptions } from "react-chatbot-kit/build/src/interfaces/IMessages";

type Props = {
  createChatBotMessage: (
    message: string,
    options: IMessageOptions
  ) => {
    loading: boolean;
    widget?: string;
    delay?: number;
    payload?: unknown;
    message: string;
    type: string;
    id: number;
  };
  setState: unknown;
  children: React.ReactElement;
};

const ActionProvider = ({ children }: Props) => {
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {},
        });
      })}
    </div>
  );
};

export default ActionProvider;
