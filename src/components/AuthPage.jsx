import Signup from "../pages/Signup";
import Login from "../pages/Login";

export default function AuthPage({ setUser }) {
  

  return (
    <div className="flex gap-10 p-10">
      <Signup setUser={setUser} />
      <Login onLogin={setUser} />
    </div>
  );
}
