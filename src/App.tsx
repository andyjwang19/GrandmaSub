import React, { useState } from "react";
import logo from "./logo.svg";
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

  const url = "http://0.0.0.0:8080/https://dining.columbia.edu/chef-mikes";
  const testUrl =
    "http://0.0.0.0:8080/https://dining.columbia.edu/content/ferris-booth-commons-0";
  const loadSite = async () => {
    try {
      const resp = await Axios.get(url);
      // .then(function (response: any) {
      //   // handle success
      //   console.log(response);
      // })
      // .catch(function (error: any) {
      //   // handle error
      //   console.log(error);
      // })
      // .finally(function () {
      //   // always executed
      // });
      const grepRes = (resp.data as string).match(
        "Chef Mike.'s Grandma Special"
      );
      if (grepRes !== null) {
        setHasGrandma(GrandmaStatus.true);
      } else {
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

  const ResultScreen = () => {
    const bgColor =
      hasGrandma === GrandmaStatus.true
        ? "bg-green-700"
        : hasGrandma === GrandmaStatus.false
        ? "bg-red-600"
        : "bg-white";
    return (
      <div
        className={`w-full h-screen flex flex-col items-center justify-center font-['Arial-Black'] ${bgColor} text-white`}
      >
        <div className="font-['Baskerville'] text-xl">
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
