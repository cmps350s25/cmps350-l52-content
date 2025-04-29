import "./module.styles.css";
import Counter from "./components/Counter";
import Bulb from "./components/Bulb";
import FriendsList from "./components/FriendsList";
import LoginForm from "./components/LoginForm";

export default function Home() {
  return (
    <main>
      <Bulb />
      <br />
      <br />
      <Counter startValue={3} />
      <br />
      <LoginForm />
      <br />
      <br />
      <FriendsList />
    </main>
  );
}
