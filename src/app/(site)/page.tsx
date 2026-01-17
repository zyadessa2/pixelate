import Image from "next/image";
import Hero from "./_components/Hero";
import About from "./_components/About";
import OurProcess from "./_components/OurProcess";
import OurService from "./_components/OurService";
import OurClient from "./_components/OurClient";
import Portfolio from "./_components/Portfolio";
import OurTeam from "./_components/OurTeam";
import GetInTouch from "./_components/GetInTouch";

export default function Home() {
  return (
    <>
    <Hero />
    <About/>
    <OurProcess/>
    <OurService/>
    <OurClient/>
    <Portfolio/>
    <OurTeam/>
    <GetInTouch/>
    </>
  );
}
