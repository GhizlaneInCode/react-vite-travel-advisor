import "./home.css"
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {

    useEffect(() => {
        let mm = gsap.matchMedia();
        const tl2 = gsap.timeline();

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".wrapper",
                scrub: 1,
                start: "150 top",
                end: "+=400",
                toggleActions: "play pause resume complete",
            },
        });

        mm.add("(min-width: 600px)", () => {

            tl2.fromTo(".content",{
                x:160,

            },{
                x:0,
                duration:2,
                delay:1
            });

            tl2.fromTo(".image",{
                x:2000,
                opacity:0,


            },{
                opacity:1,
                scale: 1.7,
                x: 1100,
                y: 70,
                delay:-1,
                duration:2,
            });



            tl.to(".image", {
                x: 80,
                y: 800,
                duration: 2,
                scale: 1,
            });

            tl.fromTo(".restImage", {
                opacity: 0,
                x: -500,


            },
                {
                    x: 300,
                    y: -50,
                    duration: 10,
                    opacity: 1,
                    scale: 1.3
                });


        });




        mm.add("(max-width: 600px)", () => {

            tl2.set(".image", {
                scale: 1,
                x: -110,
                y: 410
            });
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".wrapper",
                    start: "50 top",
                    end: "+=800",
                    scrub: true,
                }
            });


            tl.to(".image", {
                x: -120,
                y: 1010,
                duration: 5,
            });



            tl.fromTo(".restImage", {
                opacity: 0,
                x: -100,
                y: -50,
            },
                {
                    x: 240,
                    opacity: 1,
                });

        });

    }, []);


    return (
        <section className="home">
            <div className="wrapper">
                <div className="content">
                    <h1> Explore Eats & Rest </h1>
                    <p>Discover nearby dining and accommodation effortlessly with our app! Whether you're craving a gourmet meal or seeking a cozy place to stay, our interactive map guides you to the best restaurants and hotels around you. Easily explore new areas by searching for specific locations and uncover hidden gems with just a few taps</p>
                    <img className="scrollImg" src="./scroll.png" alt="" />
                </div>
                <div className="image">
                    <div className="cover">
                        <div className="logo"></div>
                    </div>
                    <img className="restImage" src="./restaurant2.png" alt="" />
                    <iframe src='https://my.spline.design/planetcopy-ffbe43e36196467f3e803d228d0dca08/' ></iframe>
                </div>
            </div>
        </section>
    );
};

export default Home;