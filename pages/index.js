// import { useEffect } from "react";
// import Router from "next/router";

// import Nav from "../components/nav";

// import useUser from "../data/use-user";
// import { login } from "../libs/auth";

// export default function App() {
//   const { user, mutate, loggedOut } = useUser();

//   // if logged in, redirect to the dashboard
//   useEffect(() => {
//     if (user && !loggedOut) {
//       Router.replace("/dashboard");
//     }
//   }, [user, loggedOut]);

//   return (
//     <div className="homepage">
//       <Nav title="ACME" />
//       <main>
//         <h1>ACME!</h1>
//         <p>Build Something Brilliant</p>
//         <br />
//         <button
//           onClick={() => {
//             login();
//             mutate(); // after logging in, we revalidate the SWR
//           }}
//         >
//           Login To Continue
//         </button>
//       </main>
//     </div>
//   );
// }

import { usePaginatePosts } from "/libs/useRequest";

import Post from "/components/post";

export default function IndexPage() {
  const {
    posts,
    error,
    isLoadingMore,
    size,
    setSize,
    isReachingEnd
  } = usePaginatePosts("/posts");

  if (error) return <h1>Something went wrong!</h1>;
  if (!posts) return <h1>Loading...</h1>;

  return (
    <div className="container">
      <h1>My Posts</h1>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
      <button
        disabled={isLoadingMore || isReachingEnd}
        onClick={() => setSize(size + 1)}
      >
        {isLoadingMore
          ? "Loading..."
          : isReachingEnd
          ? "No more posts"
          : "Load more"}
      </button>
      <style jsx global>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap");
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: "Nunito", sans-serif;
            background: #222;
            color: #fff;
            font-size: 1rem;
          }
          a {
            color: #fff;
            text-align: center;
          }
          .container {
            max-width: 728px;
            margin: auto;
            padding: 1rem;
          }
          .container > h1 {
            text-align: center;
            text-transform: uppercase;
            margin-bottom: 1rem;
            font-size: 1.4rem;
          }
          h1 {
            text-transform: capitalize;
            font-size: 1.1rem;
          }
          button {
            display: block;
            margin: auto;
            padding: 0.5rem 1rem;
            font-size: 1rem;
            font-weight: 700;
            background: #0dbbac;
            color: #fff;
            border-radius: 20px;
            border: none;
            cursor: pointer;
          }
          .Card {
            background: #333;
            padding: 1rem;
            margin-bottom: 1rem;
          }
          .Card--body {
            color: #999;
          }
        `}
      </style>
    </div>
  );
}
