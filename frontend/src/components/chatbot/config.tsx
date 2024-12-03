import { createChatBotMessage } from "react-chatbot-kit";
import IConfig from "react-chatbot-kit/build/src/interfaces/IConfig";

const config: IConfig = {
  initialMessages: [createChatBotMessage(`Hello world`, {})],
};

export default config;
