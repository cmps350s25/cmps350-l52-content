import "./index.css";
import Welcome from "./components/Welcome";
import Counter from "./components/Counter";
import GitHubUsers from "./components/GitHubUsers";
import Avatar from "./components/Avatar";
import Bulb from "./components/Bulb";
import SurahViewer from "./components/SurahViewer";
import FriendsList from "./components/FriendsList";
import LoginForm from "./components/LoginForm";
import UserInfo from "./components/UserInfo";

export default function Home() {
  return (
    <main>
      {/*   <Bulb /> */}
      <SurahViewer />
      {/*       <UserInfo firstName="Ali" lastName="Saleh"></UserInfo>

      <Welcome appName="App1">
        <p>Welcome to my first React App</p>
      </Welcome>

      <Counter startValue={3} />

      <SurahViewer />

      <Bulb />

      <div className="flex-container">
        <Avatar username="erradi" picName="abdelkarim_erradi02.jpg" />
        <Avatar username="abdulla-alali" picName="Abdulla_Khalid.jpg" />
      </div>

      <LoginForm />
      <br />
      <FriendsList />

      <GitHubUsers /> */}
    </main>
  );
}
