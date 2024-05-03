"use client";
import { SignInButton, SignOutButton, useSession } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const createThumbnail = useMutation(api.thumbnails.createThumbnail);
  const thumbnails = useQuery(api.thumbnails.getThumbnailForUser);

  const { isSignedIn } = useSession();
  return (
    <div>
      {isSignedIn ? <SignOutButton /> : <SignInButton />}

      {isSignedIn && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const title = formData.get("title") as string;
            await createThumbnail({ title });
            form.reset();
          }}
        >
          <label>Your title </label>

          <input className="text-black" type="text" name="title" />
          <button>create</button>
        </form>
      )}

      {thumbnails?.map((item) => {
        return <div key={item._id}>{item.title}</div>;
      })}
    </div>
  );
}
