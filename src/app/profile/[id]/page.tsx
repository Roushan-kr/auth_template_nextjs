import React from "react";

async function userProfile({ params }: any) {
  const {id} = await params;
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <h2 className="text-4xl">
          Profile page{" "}
          <span className="p-2 rounded bg-orange-500 text-black">
            {" "}
            {id}
          </span>{" "}
        </h2>
      </div>
    </>
  );
}

export default userProfile;
