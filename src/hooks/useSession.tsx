import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState, useContext, createContext } from "react";
import { supabase } from "../lib/api";

const SessionContext = createContext<Session | null | undefined>(undefined);

export function useSession() {
  const context = useContext(SessionContext);
  return context;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
