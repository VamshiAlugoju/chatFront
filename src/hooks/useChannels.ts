// import { useQuery, useSubscription } from "@apollo/client";
import { ChannelsContext } from "../contexts/ChannelsContext";
// import * as queries from "../graphql/queries";
// import * as subscriptions from "../graphql/subscriptions";
import useAuth from "../hooks/useAuth";
import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetcher, postData } from "../utils/api-helpers";
import toast from "react-hot-toast";
import AuthContext from "../contexts/AuthContext";

export function compareName(a: any, b: any) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

    export function useChannelsByWorkspace() {
      const location = useLocation();
      const navigate = useNavigate();
      const auth = useContext(AuthContext)
      const workspaceId = location.pathname
        .split("/dashboard/workspaces/")[1]
        ?.split("/")[0];

      const [channels, setChannels] = useState<any[]>([]);
      const [loading, setLoadnig] = useState(false);

      async function addChannel({
        name,
        details,
        workspaceId,
      }: {
        name: string;
        details: string;
        workspaceId: string;
      }) {
        try {
          const { channelId } = await postData("channels", {
            name,
            details,
            workspaceId,
          });
          await getWorkSpaceChannels();
          // navigate(`/dashboard/workspaces/${workspaceId}/channels/${channelId}`);
          toast.success("Channel created.");
        } catch (err: any) {
          toast.error(err.message);
        }
      }

      async function getWorkSpaceChannels() {
        try {
          setLoadnig(true);
          if (workspaceId) {
            const channels = await fetcher(`channels/${workspaceId}`);
            if (channels.channels) {
              setChannels(channels.channels);
            }
          } else {
            toast.error("select a workspace");
          }
          setLoadnig(false);
        } catch (err) {
          setLoadnig(false);
          console.log(err);
        }
      }

      useEffect(() => {
        if(auth.isAuthenticated == true && workspaceId){
          getWorkSpaceChannels();
        }
      }, [auth.isAuthenticated ,workspaceId]);

      //change

      // useEffect(() => {
      //   if (data) setChannels(data.listChannels);
      // }, [data]);

      // useEffect(() => {
      //   if (dataPush) {
      //     setChannels([
      //       ...channels.filter(
      //         (item) => item.objectId !== dataPush.onUpdateChannel.objectId
      //       ),
      //       dataPush.onUpdateChannel,
      //     ]);
      //   }
      // }, [dataPush]);
      // const arr = [...channels]
      //   .sort(compareName)
      //   ?.filter((c) => c.isDeleted === false);
      console.log(channels , "original chann")
      
      const contextValue = useMemo (() => ({
        value: channels,
        loading,
        addChannel,
      }), [channels, loading]);
    
      console.log('Channels data in hook:', contextValue); // Debug logging
    
      return contextValue;
    }

export function useChannels() {
  const { user }: any = useAuth();
  const { value } = useContext(ChannelsContext);
  return {
    value: value?.filter(
      (c: any) =>
        c.members.includes(user?._id) &&
        c.isArchived === false &&
        c.isDeleted === false
    ),
  };
}

export function useChannelById(id: any) {
  const { value } = useContext(ChannelsContext);
 
  return { value: value?.find((p: any) => p.objectId === id) };
}
