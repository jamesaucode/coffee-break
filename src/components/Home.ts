import m from "mithril";
import Player from "./Player";
import Intro from "./Intro";

const Home = {
  view: () => {
    return m("main.h-screen flex flex-col md:flex-row", [m(Intro), m(Player)]);
  },
};

export default Home;
