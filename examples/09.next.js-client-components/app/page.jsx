import Welcome from "./basics/components/Welcome";
import Avatar from "./basics/components/Avatar";
import UserInfo from "./basics/components/UserInfo";

export default function Home() {
  return (
    <main>
      <Welcome appName="App1">
        <p>Welcome to my first React App</p>
      </Welcome>

      <UserInfo firstName="Ali" lastName="Saleh"></UserInfo>

      <div className="flex-container">
        <Avatar username="erradi" picName="abdelkarim_erradi02.jpg" />
        <Avatar username="abdulla-alali" picName="Abdulla_Khalid.jpg" />
      </div>
    </main>
  );
}
