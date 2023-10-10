import React, { useState } from "react";
import "./App.css";
import Axios from "axios";

enum GrandmaStatus {
  "loading",
  "true",
  "false",
}
function App() {
  const [hasGrandma, setHasGrandma] = useState<GrandmaStatus>(
    GrandmaStatus.loading
  );

  const url =
    "https://cors-reroute-72fe9db28c00.herokuapp.com/https://dining.columbia.edu/chef-mikes";
  // const url = "http://0.0.0.0:8080/https://dining.columbia.edu/chef-mikes";
  const testUrl =
    "https://cors-reroute-72fe9db28c00.herokuapp.com/https://dining.columbia.edu/content/ferris-booth-commons-0";
  const loadSite = async () => {
    try {
      const cutDate = (isoString: string, from: boolean) => {
        return isoString
          .slice(0, isoString.indexOf("T"))
          .concat(from ? "T14:30:00" : "T02:00:00");
      };

      const resp = await Axios.get(url);

      const grepIdx = (search: string): number => {
        const res = (resp.data as string).match(search);
        if (res === null || res === undefined) {
          return -1;
        }
        return res.index as number;
      };

      const sandwichIdx = grepIdx("Chef Mike.'s Grandma Special");
      if (sandwichIdx === -1) {
        setHasGrandma(GrandmaStatus.false);
        console.log(`Sandwich not found this week`);
        return;
      }

      const date_from_idx = (resp.data as string).lastIndexOf(
        "date_from",
        sandwichIdx
      );

      const todayDate = new Date();

      const todayIsoString = todayDate.toISOString();

      const today = cutDate(todayIsoString, true);

      const todayIdx = grepIdx(today);
      console.log(`RESULT`, sandwichIdx, date_from_idx, todayIdx);
      if (todayIdx > date_from_idx && todayIdx < sandwichIdx) {
        setHasGrandma(GrandmaStatus.true);
      } else {
        console.log(`Sandwich in this week, not today.`);
        setHasGrandma(GrandmaStatus.false);
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };
  loadSite();

  const positiveTitle = [
    "YES THEY HAVE IT",
    "IT'S THERE!",
    "THEY ARE SERVING THE GRANDMA SUB",
  ];
  const positiveSubTitle = [
    "What are you waiting for?",
    "Oh, Happy day!",
    "Go now...",
  ];

  const negativeTitle = ["NOT TODAY", "THEY DO NOT HAVE IT", "NO GRANDMA SUB"];
  const negativeSubTitle = [
    "I'm sure the other sandwiches are great...",
    "Disappointing I know...",
    "Try your luck tomorrow",
  ];

  const pickRandom = (titles: string[]) => {
    return titles.at(Math.round(Math.random() * titles.length - 1));
  };

  const ResultScreen = () => {
    const bgColor =
      hasGrandma === GrandmaStatus.true
        ? "bg-green-700"
        : hasGrandma === GrandmaStatus.false
        ? "bg-red-600"
        : "bg-white";
    return (
      <div
        className={`w-full h-screen flex flex-col items-center justify-center font-sans ${bgColor} text-white text-center`}
      >
        <div className="font-serif text-xl">
          do they have the Grandma Special at Chef Mikes?
        </div>
        {hasGrandma === GrandmaStatus.loading ? (
          <div className="text-4xl text-black">LOADING...</div>
        ) : hasGrandma === GrandmaStatus.true ? (
          <div>
            <div className="text-5xl">{pickRandom(positiveTitle)}</div>
            <div className="text-xl font-serif">
              {pickRandom(positiveSubTitle)}
            </div>
          </div>
        ) : (
          <div>
            <div className="text-5xl">{pickRandom(negativeTitle)}</div>
            <div className="text-xl font-serif">
              {pickRandom(negativeSubTitle)}
            </div>
          </div>
        )}
      </div>
    );
  };
  return <ResultScreen />;
}

export default App;
