import { ChatPlugin } from "./plugins/chat_plugin";
import type { interfaces } from "inversify";
import { Container } from "inversify";

let container: interfaces.Container | undefined;

export const getContainer = async (): Promise<interfaces.Container> => {
  if (container === null) {
    container = new Container({
      defaultScope: "Request",
      skipBaseClassChecks: true,
    });

    // load sync and async modules ...
    container.load(ChatPlugin);
    // await container.loadAsync(...);
  }

  return container;
};
