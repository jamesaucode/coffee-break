import "style/custom.css";
import m from "mithril";
import PlayButton from "icons/play.svg";
import PauseButton from "icons/pause.svg";
import StopButton from "icons/stop2.svg";
import VolMd from "icons/volume-medium.svg";
import VolSm from "icons/volume-low.svg";
import VolLg from "icons/volume-high.svg";
import VolMuted from "icons/volume-mute2.svg";
import VolNone from "icons/volume-mute.svg";
import cond from "ramda/src/cond";
import T from "ramda/src/T";
import gte from "ramda/src/gte";
import always from "ramda/src/always";
import equals from "ramda/src/equals";

const FILEPREFIX = "../../static/sounds/";
const SONGS = ["Normal.mp3", "Busy.mp3", "ayy.mp3"];

const componentState = {
  playing: false,
  currentTime: 0,
  endTime: 0,
  currentSong: SONGS[0],
  volume: 0.5,
  muted: false,
};
const play = () => {
  const audio = document.getElementById("audio") as HTMLAudioElement;
  audio.play();
};
const pause = () => {
  const audio = document.getElementById("audio") as HTMLAudioElement;
  audio.pause();
};
const stop = () => {
  const audio = document.getElementById("audio") as HTMLAudioElement;
  audio.pause();
  audio.currentTime = 0;
};
const mute = () => {
  const audio = document.getElementById("audio") as HTMLAudioElement;
  audio.muted = !audio.muted;
  componentState.muted = audio.muted;
};
const volToIcon = cond([
  [equals(0), always(VolNone)],
  [gte(0.25), always(VolSm)],
  [gte(0.5), always(VolMd)],
  [T, always(VolLg)],
]);
const getVolIcon = () => {
  const audio = document.getElementById("audio") as HTMLAudioElement;
  const isMuted = audio.muted;
  if (isMuted) {
    return VolMuted;
  }
  const vol = audio.volume;
  return volToIcon(vol);
};
const handlePlay = () => {
  componentState.playing = true;
};
const handlePause = () => {
  componentState.playing = false;
};
const handleLoadedMetaData = (event: { target: HTMLAudioElement }) => {
  componentState.currentTime = 0;
  componentState.endTime = event.target.duration;
  componentState.playing = false;
  event.target.pause();
  event.target.volume = componentState.volume;
};
const handleTimeUpdate = (event: { target: HTMLAudioElement }) => {
  componentState.currentTime = event.target.currentTime;
  m.redraw();
};
const handleClick = (event: MouseEvent) => {
  const audio = document.getElementById("audio") as HTMLAudioElement;
  const progressBar = event.target as HTMLDivElement;
  audio.volume =
    (event.pageX - progressBar.offsetLeft) / progressBar.offsetWidth;
};
const handleVolumeChange = (event: { target: HTMLAudioElement }) => {
  componentState.volume = event.target.volume;
  const volIcon = document.getElementById("vol") as HTMLImageElement;
  volIcon.src = getVolIcon();
};
const handleKeyDown = (event: KeyboardEvent) => {
  const audio = document.getElementById("audio") as HTMLAudioElement;
  switch (event.key) {
    case "ArrowDown":
      audio.volume -= 0.05;
      break;
    case "ArrowUp":
      audio.volume += 0.05;
      break;
    default:
      throw new Error();
  }
};
const handleSongClick = (event: MouseEvent) => {
  const dom = event.target as HTMLLIElement;
  componentState.currentSong = dom.innerText;
};

const Player = (): m.Component => {
  return {
    view: () =>
      m(".flex flex-col items-center justify-center flex-1 p-4", [
        m(
          "div[tabindex=0].flex bg-indigo-400 p-4 items-center max-w-lg w-full rounded",
          {
            onkeydown: handleKeyDown,
          },
          [
            m("audio#audio", {
              src: `${FILEPREFIX}/${componentState.currentSong}`,
              onplay: handlePlay,
              onpause: handlePause,
              onloadedmetadata: handleLoadedMetaData,
              ontimeupdate: handleTimeUpdate,
              onvolumechange: handleVolumeChange,
              loop: true,
            }),
            m("img.mr-4 cursor-pointer", {
              src: componentState.playing ? PauseButton : PlayButton,
              onclick: componentState.playing ? pause : play,
            }),
            m("img.mr-4 cursor-pointer", {
              src: StopButton,
              onclick: stop,
            }),
            m("img#vol.mr-4 cursor-pointer", {
              onclick: mute,
            }),
            m(
              "div[role=button].h-2 bg-gray-600 opacity-75 w-full ml-4 cursor-pointer",
              {
                onclick: handleClick,
              },
              [
                m("div.h-2 bg-white opacity-75", {
                  style: {
                    transform: `scaleX(${componentState.volume / 1})`,
                    transition: "200ms ease",
                    transformOrigin: "left",
                  },
                }),
              ],
            ),
          ],
        ),
        m(".flex flex-col p-4 my-4 w-full max-w-xl", [
          m("h2.text-xl text-white bg-indigo-400 p-3", "Playlist"),
          m(
            "ul.flex flex-col",
            SONGS.map((song, index) =>
              m(
                `li.cursor-pointer px-3 py-4 text-gray-700 
                 ${
                   componentState.currentSong === song
                     ? "font-semibold text-gray-800 bg-gray-200"
                     : ""
                 }`,
                {
                  onclick: handleSongClick,
                  key: index,
                },
                `${song}`,
              ),
            ),
          ),
        ]),
      ]),
  };
};

export default Player;
