import m from "mithril";
import Home from "./components/Home";

m.route(document.getElementById("app"), "/home", {
  "/home": Home,
});
