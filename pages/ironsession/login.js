import React, { useState } from "react";
import useUser from "/lib/ironsession/useUser";
import Layout from "/components/ironsession/Layout";
import Form from "/components/ironsession/Form";
import fetchJson, { FetchError } from "/lib/ironsession/fetchJson";

export default function Login() {
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: "/ironsession/profile-sg",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");

  return (
    <Layout>
      <div className="login">
        <Form
          errorMessage={errorMsg}
          onSubmit={async function handleSubmit(event) {
            event.preventDefault();

            const body = {
              username: event.currentTarget.username.value,
            };

            try {
              mutateUser(
                await fetchJson("/api/ironsession/login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                }),
                false,
              );
            } catch (error) {
              if (error instanceof FetchError) {
                setErrorMsg(error.data.message);
              } else {
                console.error("An unexpected error happened:", error);
              }
            }
          }}
        />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  );
}
