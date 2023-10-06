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
      const resp = await Axios.get(url);
      const grepRes = (resp.data as string).match(
        "Chef Mike.'s Grandma Special"
      );
      const date = new Date();
      // const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+1}`
      // const isoString = date.toISOString();
      // const today = isoString
      //   .slice(0, isoString.indexOf("T"))
      //   .concat("T15:00:00");

      // const todayIdx = (resp.data as string).match(today)?.index;
      // console.log(`todayIdx`, todayIdx);
      // console.log(`grepres`, grepRes);
      //date_from\":\"2023-10-05T15:00:00
      if (grepRes !== null) {
        setHasGrandma(GrandmaStatus.false);
        // if ((grepRes as any).index > (todayIdx as number)) {
        // } else {
        //   setHasGrandma(GrandmaStatus.false);
        // }
      } else {
        setHasGrandma(GrandmaStatus.true);
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };
  loadSite();

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
          <div className="text-4xl ">LOADING...</div>
        ) : hasGrandma === GrandmaStatus.true ? (
          <div className="text-5xl">YES THEY HAVE IT</div>
        ) : (
          <div className="text-5xl">NOT TODAY</div>
        )}
      </div>
    );
  };
  return <ResultScreen />;
}

export default App;
