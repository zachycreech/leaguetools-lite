import { LCUTypes } from "@hasagi/core";
import HasagiClient, { Hasagi, ChampSelectSession } from "@hasagi/extended";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { Client } from "./hasagi-client";
import LoLExternalApi from "./api/externalApis";

// Navigation context
export const DefaultNavigationContext = {
  page: "",
  setPage: null! as (page: string) => void,
};

export const NavigationContext = createContext(DefaultNavigationContext);

// League of Legends context
export const DefaultLoLContext = {
  state: "None" as
    | "Lobby"
    | "InQueue"
    | "ChampSelect"
    | "InGame"
    | "PostGame"
    | "None",
  gameflowPhase: "None",
  isConnected: false,
  runePages: [],
} as {
  gameflowPhase: Hasagi.GameflowPhase;
  isConnected: boolean;
  runePages: ReadonlyArray<Hasagi.RunePage>;
  liveClientData?: Awaited<
    ReturnType<HasagiClient["LiveClient"]["getLiveClientData"]>
  >;
  lobby?: Hasagi.Lobby;
  queueState?: Hasagi.QueueState;
  champSelectSession?: ChampSelectSession;
  endOfGameStats?: Hasagi.EndOfGameData;
  summoner?: LCUTypes.LolSummonerSummoner;
  matches?: LCUTypes.LolMatchHistoryMatchHistoryList;
  items?: any;
  runes?: any;
  champions?: any;
} & (
  | { state: "None" }
  | { state: "Lobby"; lobby: Hasagi.Lobby }
  | { state: "InQueue"; lobby: Hasagi.Lobby; queueState: Hasagi.QueueState }
  | {
      state: "ChampSelect";
      lobby: Hasagi.Lobby;
      champSelectSession: ChampSelectSession;
    }
  | {
      state: "InGame";
      lobby: Hasagi.Lobby;
      liveClientData: Awaited<
        ReturnType<HasagiClient["LiveClient"]["getLiveClientData"]>
      >;
    }
  | {
      state: "PostGame";
      lobby: Hasagi.Lobby;
      endOfGameStats: Hasagi.EndOfGameData;
    }
);

export const LoLContext = createContext(DefaultLoLContext);

export function ContextProviders(props: PropsWithChildren) {
  const [navigationContext, setNavigationContext] = useState(
    DefaultNavigationContext,
  );
  useEffect(() => {
    if (navigationContext.setPage === null)
      setNavigationContext((ctx) => ({
        ...ctx,
        setPage: (page) => setNavigationContext((ctx) => ({ ...ctx, page })),
      }));
  }, [navigationContext.setPage]);

  const [lolContext, setLoLContext] = useState(DefaultLoLContext);
  useEffect(() => {
    Client.on("connection-state-change", (isConnected) =>
      setLoLContext((ctx) => ({ ...ctx, isConnected })),
    );
    Client.on("disconnected", () =>
      Client.connect({
        authenticationStrategy: "lockfile",
        lockfile:
          "/games/league-of-legends/drive_c/Riot Games/League of Legends/lockfile",
      }),
    );
    Client.on("rune-pages-update", (runePages) =>
      setLoLContext((ctx) => ({
        ...ctx,
        runePages: runePages.filter((r) => r.isEditable),
      })),
    );

    Client.on("lobby-update", (lobby) => {
      if (lobby) setLoLContext((ctx) => ({ ...ctx, lobby }));
    });

    Client.on("queue-state-update", (queueState) => {
      if (queueState) {
        setLoLContext((ctx) => ({ ...ctx, queueState }));
      } else {
        setLoLContext((ctx) => ({ ...ctx }) as any);
      }
    });

    Client.on("champ-select-session-update", (champSelectSession) => {
      if (champSelectSession) {
        setLoLContext((ctx) => ({ ...ctx, champSelectSession }));
      } else {
        setLoLContext((ctx) => ({ ...ctx }) as any);
      }
    });

    Client.on("gameflow-phase-update", (phase) => {
      setLoLContext((ctx) => ({ ...ctx, gameflowPhase: phase }));
    });

    Client.on("end-of-game-data-received", (endOfGameStats) => {
      setLoLContext((ctx) => ({ ...ctx, endOfGameStats }));
    });

    Client.connect({
      authenticationStrategy: "lockfile",
      lockfile:
        "/games/league-of-legends/drive_c/Riot Games/League of Legends/lockfile",
    });
  }, []);

  useEffect(() => {
    if (lolContext.isConnected) {
      Client.getLocalSummoner().then((summoner) => {
        setLoLContext((ctx) => ({
          ...ctx,
          summoner,
        }));
      });

      Client.request({
        method: "get",
        url: "/lol-match-history/v1/products/lol/current-summoner/matches",
      }).then((value) => {
        setLoLContext((ctx) => ({
          ...ctx,
          matches: value,
        }));
      });

      LoLExternalApi.getAllChampions().then((champions) => {
        setLoLContext((ctx) => ({
          ...ctx,
          champions,
        }));
      });

      LoLExternalApi.getAllItems().then((items) => {
        setLoLContext((ctx) => ({
          ...ctx,
          items,
        }));
      });

      LoLExternalApi.getAllRunes().then((runes) => {
        setLoLContext((ctx) => ({
          ...ctx,
          runes,
        }));
      });
    }
  }, [lolContext.isConnected]);

  useEffect(() => {
    if (lolContext.gameflowPhase === "None" && lolContext.state !== "None") {
      setLoLContext((ctx) => {
        const context = structuredClone(ctx);
        context.state = "None";
        delete context.lobby;
        delete context.queueState;
        delete context.champSelectSession;
        delete context.liveClientData;
        delete context.endOfGameStats;
        return context;
      });
    } else if (
      lolContext.gameflowPhase === "Lobby" &&
      lolContext.state !== "Lobby"
    ) {
      if (lolContext.lobby !== undefined)
        setLoLContext((ctx) => {
          const context = structuredClone(ctx);
          context.state = "Lobby";
          context.lobby = ctx.lobby!;
          delete context.queueState;
          delete context.champSelectSession;
          delete context.liveClientData;
          delete context.endOfGameStats;
          return context;
        });
    } else if (
      lolContext.gameflowPhase === "Matchmaking" &&
      lolContext.state !== "InQueue"
    ) {
      if (lolContext.lobby !== undefined && lolContext.queueState !== undefined)
        setLoLContext((ctx) => {
          const context = structuredClone(ctx);
          context.state = "InQueue";
          context.lobby = ctx.lobby!;
          context.queueState = ctx.queueState!;
          delete context.champSelectSession;
          delete context.liveClientData;
          delete context.endOfGameStats;
          return context;
        });
    } else if (
      lolContext.gameflowPhase === "ChampSelect" &&
      lolContext.state !== "ChampSelect"
    ) {
      if (
        lolContext.lobby !== undefined &&
        lolContext.champSelectSession !== undefined
      )
        setLoLContext((ctx) => {
          const context = structuredClone(ctx);
          context.state = "ChampSelect";
          context.lobby = ctx.lobby!;
          context.champSelectSession = ctx.champSelectSession!;
          delete context.queueState;
          delete context.liveClientData;
          delete context.endOfGameStats;
          return context;
        });
    } else if (
      lolContext.gameflowPhase === "InProgress" &&
      lolContext.state !== "InGame"
    ) {
      if (
        lolContext.lobby !== undefined &&
        lolContext.liveClientData !== undefined
      )
        setLoLContext((ctx) => {
          const context = structuredClone(ctx);
          context.state = "InGame";
          context.lobby = ctx.lobby!;
          context.liveClientData = ctx.liveClientData!;
          delete context.queueState;
          delete context.champSelectSession;
          delete context.endOfGameStats;
          return context;
        });
    } else if (
      lolContext.gameflowPhase === "EndOfGame" &&
      lolContext.state !== "PostGame"
    ) {
      if (
        lolContext.lobby !== undefined &&
        lolContext.endOfGameStats !== undefined
      )
        setLoLContext((ctx) => {
          const context = structuredClone(ctx);
          context.state = "PostGame";
          context.lobby = ctx.lobby!;
          context.endOfGameStats = ctx.endOfGameStats!;
          delete context.queueState;
          delete context.champSelectSession;
          delete context.liveClientData;
          return context;
        });
    }
  }, [
    lolContext.champSelectSession,
    lolContext.endOfGameStats,
    lolContext.gameflowPhase,
    lolContext.liveClientData,
    lolContext.lobby,
    lolContext.queueState,
    lolContext.state,
  ]);

  return (
    <NavigationContext.Provider value={navigationContext}>
      <LoLContext.Provider value={lolContext}>
        {props.children}
      </LoLContext.Provider>
    </NavigationContext.Provider>
  );
}
