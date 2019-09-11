import m from "mithril";

const Intro = (): m.Component => {
  return {
    view: () =>
      m(
        ".flex flex-col flex-none md:flex-1 items-center justify-center p-4 intro",
        [
          m("div.pr-6", [
            m(
              "h2.text-gray-700 text-5xl font-semibold antialiased mb-10",
              "Boost your productivity",
            ),
            m(
              "p.text-gray-700 text-md leading-relaxed mb-10",
              "Dolor nisi fuga dolorem alias doloremque? Sapiente ipsa a maiores nobis numquam Tempore soluta officia unde harum quae, at porro Commodi nemo ",
            ),
            m(
              "p.text-gray-400 text-md leading-relaxed mb-10",
              "Dolor nisi fuga dolorem alias doloremque? Sapiente ipsa a maiores nobis numquam Tempore soluta officia unde harum quae, at porro Commodi nemo ",
            ),
          ]),
        ],
      ),
  };
};

export default Intro;
