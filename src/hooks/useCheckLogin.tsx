import { useSession } from "./useSession";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function useCheckLogin() {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session !== undefined && !session) {
      navigate("/login");
    }
  }, [session, navigate]);
}
