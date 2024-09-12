// import { useQuery, useSubscription } from "@apollo/client";
import { useUser } from "../contexts/UserContext";
// import * as queries from "graphql/queries";
// import * as subscriptions from "graphql/subscriptions";
import React, { createContext, useContext, useEffect, useState } from "react";
import { fetcher, postData } from "../utils/api-helpers";
import toast from "react-hot-toast";
import useAuth from "./useAuth";
export const WorkspacesContext = createContext({
  value: null as any,
  loading: true,
  addNewWorkspace: async (name: string) : Promise<any> => {},
});

export function useMyWorkspaces() {
  const { user } = useUser();
  const { value, loading } = useContext(WorkspacesContext);
  
  const arr = value?.filter((item : any) => item.isDeleted === false  && item.members.includes(user?._id)).sort((a: any, b: any) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
   console.log(arr , user , 'helooooooooooooooo')
  return {
    value:  arr,
    loading,
  };
}

export function WorkspacesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const auth = useAuth()
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [loading, setIsLoading] = useState(true);
  // const { data, loading } = useQuery(queries.LIST_WORKSPACES, {
  //   skip: !user,
  //   fetchPolicy: "cache-and-network",
  // });
  // const { data: dataPush } = useSubscription(subscriptions.WORKSPACE, {
  //   skip: !user,
  // });

  //change
 
  async function getWorkspaces() {
    setIsLoading(true);
    try {
      const data = await fetcher("workspaces");
     
      if (data) setWorkspaces(data.workspaces);

      setIsLoading(false);
      
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getWorkspaces();
  }, [auth.isAuthenticated , user ]);

  async function addNewWorkspace(name: string) {
    try {
      const data =  await postData("workspaces", {
        name,
      });
      await getWorkspaces();
      return data;
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message);
    }
  }

  // const data = {
  //   workspaces: [],
  // };
  // const dataPush = {
  //   onUpdateWorkspace: {
  //     objectId: "flsdkfjl",
  //   },
  // };

  // useEffect(() => {
  //   if (data) setWorkspaces(data.listWorkspaces);
  // }, [data]);

  // useEffect(() => {
  //   if (dataPush) {
  //     setWorkspaces([
  //       ...workspaces.filter(
  //         (item) => item.objectId !== dataPush.onUpdateWorkspace.objectId
  //       ),
  //       dataPush.onUpdateWorkspace,
  //     ]);
  //   }
  // }, [dataPush]);
  return (
    <WorkspacesContext.Provider
      value={{
        value: workspaces?.filter((w: any) => w.isDeleted === false),
        loading,
        addNewWorkspace,
      }}
    >
      {children}
    </WorkspacesContext.Provider>
  );
}

export function useWorkspaceById(id: any) {
  const { value } = useContext(WorkspacesContext);
  return { value: value?.find((p: any) => p._id === id) };
}
