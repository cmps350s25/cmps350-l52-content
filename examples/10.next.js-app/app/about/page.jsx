import FriendsList from "./FriendsList";
import Welcome from "./Welcome";

export default function AboutPage() {
  // Cookies, Path parameters, and Headers 
  // Next.js will render page statically
  return <div>
    About page 
    <a href="/">Home</a>
    <Welcome name="CMPS 350 Students" />
    <FriendsList friends={["Alice", "Bob", "Ali"]} />
  </div>;
}
