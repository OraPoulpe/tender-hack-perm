import { createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { io } from "socket.io-client";
import { IMessage } from "../../interfaces/message";

export const chatApi = createApi({
  reducerPath: "chat",
  // tagTypes: ["Messages"],
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (build) => ({
    getMessage: build.query<IMessage[], number>({
      queryFn: (user_id) => ({ data: [] }),
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;

          const ws = new WebSocket(`wss://acmenra.tech/api/agreements/chat?user_id=${arg}`);

          ws.onmessage = (event) => {
            const data = JSON.parse(event.data) as IMessage[];
            console.log("Received data:", new Date(Date.now()), data);
            updateCachedData((draft) => {
              data.forEach((el) => draft.push(el));
            });
          };

          // Handle WebSocket errors
          ws.onerror = (error) => {
            console.error("WebSocket error:", error);
          };

          // Handle WebSocket close
          ws.onclose = (event) => {
            if (event.wasClean) {
              console.log("WebSocket closed cleanly");
            } else {
              console.error("WebSocket connection error");
            }
          };

          await cacheEntryRemoved;

          // Close the WebSocket connection when the cache entry is removed
          ws.close();
        } catch (error) {
          console.error("Error in WebSocket connection:", error);
        }
      },
      // providesTags: [{ type: "Messages", id: "List" }],
    }),
    // sendMessage: build.mutation<void, { message: string; userId: number }>({
    //   query: async ({ message, userId }) => {
    //     try {
    //       // Create WebSocket connection
    //       const ws = new WebSocket(`wss://acmenra.tech/api/agreements/chat?user_id=${userId}`);

    //       // Wait for the WebSocket to open
    //       await new Promise<void>((resolve, reject) => {
    //         ws.onopen = () => resolve();
    //         ws.onerror = (error) => reject(error);
    //       });

    //       // Send the message
    //       ws.send(message);

    //       // Close the WebSocket connection
    //       ws.close();

    //       // return { data: undefined };
    //     } catch (error) {
    //       console.error("Error sending message via WebSocket:", error);
    //       return { error: "Failed to send message" };
    //     }
    //   },
    //   // invalidatesTags: [{ type: "Messages", id: "List" }],
    // }),
  }),
});

export const { useLazyGetMessageQuery } = chatApi;
