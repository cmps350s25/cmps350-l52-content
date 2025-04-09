import FriendsList from "./FriendsList";
import Greeting from "./Greeting";
import Welcome from "./Welcome";

export default function AboutPage() {
  return (
    <div>
      About page
      <Welcome name="CMPS 350 Students" />
      <Greeting name="CMPS 350 Students" />
      <FriendsList friends={["Alice", "Bob", "Ali"]} />
    </div>
  );
}
