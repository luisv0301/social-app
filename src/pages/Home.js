import Posts from "../components/Posts";
import Nav from "../components/Nav";

import "./home.scss";

export default function Home() {
  return (
    <div className="home">
      <Nav />
      <Posts />
    </div>
  );
}
