import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { supabase } from "../lib/api";
import { Button, FlexContainer, Input } from "../styles/globals";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      console.error(error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <React.Fragment>
      <FlexContainer column alignItems="center">
        <p className="description">
          Sign in via magic link with your email below
        </p>
        {loading ? (
          "Sending magic link..."
        ) : (
          <React.Fragment>
            <h3>Email</h3>
            <Input
              id="email"
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleLogin}>Send magic link</Button>
          </React.Fragment>
        )}
      </FlexContainer>
    </React.Fragment>
  );
}
