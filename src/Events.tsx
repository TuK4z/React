import { DependencyList, useEffect } from "react";

type EventCallback = (...args: any[]) => void | Promise<void>;

function useAltEvent(eventName: string, callback: EventCallback, deps: DependencyList = []) {
  if (!altUtils.isInGame) {
    console.log(`[useAltEvent]: Registered event '${eventName}'`);
    return;
  }

  useEffect(() => {
    alt.on(eventName, callback);
    return () => alt.off(eventName, callback);
  }, deps);
}

const altUtils = {
  isInGame: "alt" in window,

  emit: (eventName: string, ...args: any[]) => {
    if (!altUtils.isInGame) {
      console.log(`[useAltEvent]: Emitting event '${eventName}' with args: ${args}`);
      return;
    }

    alt.emit(eventName, ...args);
  },

  emitServer: (eventName: string, ...args: any[]) => {
    altUtils.emit('Webview:emitServerEvent', eventName, ...args);
  }
};

export default { useAltEvent, altUtils };