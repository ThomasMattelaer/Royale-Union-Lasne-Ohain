import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import Account from "../../components/account/Account";
import { router } from "expo-router";

export default function AccountPage() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  
  useEffect(() => {
    if (!session) return;

    async function loadRole() {
      if (!session) return;
      
      const role = await getUserRole(session.user.id);

      if (role === "player") router.replace("/authenticated/player");
      else if (role === "admin") router.replace("/authenticated/admin");
      else if (role === "bar") router.replace("/authenticated/bar");
    }

    loadRole();
  }, [session]);

  return null; 
  
}

async function getUserRole(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("role")       
    .eq("id", userId)     
    .single();        

  if (error) {
    console.error("Erreur lors de la récupération du rôle :", error);
    return null;
  }

  return data?.role;
}