import { useEffect, useState } from "react";
import { supabase } from "../lib/api";
import { useSession } from "./useSession";

export function useAccount() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const session = useSession();

  useEffect(() => {
    const getProfile = async () => {
      if (!session) return;
      try {
        setLoading(true);
        const { user } = session;

        let { data, error, status } = await supabase
          .from("profiles")
          .select(`username, website, avatar_url`)
          .eq("id", user?.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setUsername(data.username);
          setWebsite(data.website);
          setAvatarUrl(data.avatar_url);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, [session]);

  const updateProfile = async (e: any) => {
    e.preventDefault();
    if (!session) return;
    try {
      setLoading(true);
      const { user } = session;

      const updates = {
        id: user?.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
}
