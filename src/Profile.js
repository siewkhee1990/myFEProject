import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Profile() {
  const profile = useSelector((state) => state.user.profile);
  return (
    <div>
      Profile
      <br />
      <img src={profile.picture} alt='default' />
      <br />
      Welcome, {profile.name}
      <br />
      email: {profile.email}
      <br />
    </div>
  );
}
