import { compareName, useChannelsByWorkspace } from "../hooks/useChannels";
import { createContext, useEffect, useMemo, useState } from "react";

export const ChannelsContext = createContext({
  value: null as any,
  loading: true,
  // addChannel: async (props: {
  //   name: string;
  //   details: string;
  //   workspaceId: string;
  // }) => {},
});

export function ChannelsProvider({ children }: { children: React.ReactNode }) {
  const channelsData = useChannelsByWorkspace();
  //change
  console.log(">>>>>>>>>.. all channels", channelsData);
  return (
    <ChannelsContext.Provider value={channelsData}>
      {children}
    </ChannelsContext.Provider>
  );
}
