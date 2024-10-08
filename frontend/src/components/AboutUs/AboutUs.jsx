import React, { useRef, useState, useEffect } from "react";
import './about.css'; 

const AboutUs = () => {
  const [showMore, setShowMore] = useState(false);
  const sectionRef = useRef(null);

  const handleToggleShowMore = () => {
    setShowMore(prevState => !prevState);
  /*
    if (!showMore) {
      sectionRef.current?.scrollIntoView({ behavior:"smooth" });
    } else {
      window.scrollTo({ behavior: "smooth" });
    }
   */
  };

  return (
    <div id="about" className="pt-12">
      <Header />
      <HeroSection showMore={showMore} onToggleShowMore={handleToggleShowMore} />
      <div ref={sectionRef} className={`transition-section ${showMore ? "open" : ""}`}>
        <Whatsection />
      </div>
      <Joinsection />
    </div>
  );
};

const Header = () => (
  <section className="pt-10">
    <div className="about pl-4 py-6">
      <h1 className="font-extrabold text-orange-500 lg:text-5xl md:text-4xl sm:text-3xl text-3xl">About Us</h1>
      <hr className="sm:border-t-2 ml-48 md:ml-72 lg:ml-96 sm:ml-64 md:border-t-3 " />
    </div>
  </section>
);

const HeroSection = ({ showMore, onToggleShowMore }) => (
  <section className="lg:bg-gradient-to-b bg-gradient-to-b from-red-400 to-purple-400 text-white">
    <div className="">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 p-8">
          <h1 className="lg:text-5xl md:text-4xl sm:text-4xl text-4xl font-bold text-gray-900">Innovation Cell,</h1>
          <p className="lg:text-xl md:text-lg sm:text-md text-gray-900 text-justify">The epicenter of creativity and entrepreneurship at</p>
          <h1 className="lg:text-5xl md:text-4xl sm:text-4xl text-4xl font-bold text-gray-900">NIT KURUKSHETRA</h1>
          <p className="lg:text-xl md:text-lg sm:text-md text-justify text-white mt-14 md:mt-20">
            Established under the aegis of the Ministry of Education, our society is dedicated to fostering a culture of innovation, entrepreneurship, and financial literacy among students.
          </p>
          <button
            onClick={onToggleShowMore}
            className="mt-12 px-5 py-3 bg-gray-900 text-white font-semibold rounded hover:bg-white flex transition duration-300 ease-out-in transform hover:scale-95 hover:text-indigo-600"
          >
            {showMore ? "See less" : "Know more about us"}
          </button>
        </div>
        <div className="lg:w-1/2 mt-10 lg:mt-0 relative">
          <img src="/about.png" alt="About" className="w-full border" />
          <div className="absolute inset-0 lg:bg-gradient-to-l bg-gradient-to-t from-black via-transparent to-transparent opacity-90 lg:opacity-70 "></div>
        </div>
      </div>
    </div>
  </section>
);

const Whatsection = () => (
  <section className="py-6 bg-white text-black pt-12">
    <div className="container mx-auto md:px-12 lg:px-32 px-2">
      <div className="gap-2 mt-6">
        <WhatCard 
          title="What's our motive?"
          description="Our aim is to inspire and support students passionate about finance, startups, innovation, and entrepreneurship. We nurture the next generation of thinkers and leaders by providing events, workshops, and mentorship to help turn ideas into reality."
        />
        <WhatCard 
          title="What do we offer?"
          description="A platform for aspiring entrepreneurs to connect, collaborate, and learn through hackathons, pitch events, industry talks, and networking with business leaders. We also provide guidance on business planning, fundraising, and market research to help members launch and grow their startups."
        />
      </div>
    </div>
  </section>
);

const WhatCard = ({ title, description }) => (
  <div className="text-center">
    <h4 className="lg:text-2xl md:text-xl sm:text-xl text-xl xl:text-3xl font-semibold">{title}</h4>
    <p className="mt-2 lg:text-lg pb-10 md:text-md sm:text-sm text-md xl:text-xl text-justify">{description}</p>
  </div>
);

const TypingText = ({ text, speed = 150, startTyping }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const audioRef = useRef(null);

  // Function to reset the typing text
  const resetTyping = () => {
    setDisplayedText('');
    setIsTyping(false);
  };

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.loop = true;
        audioRef.current.play().catch((e) => {
          console.log("Audio playback prevented by browser policy: ", e);
        });
      }
    };

    const stopAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset sound
      }
    };

    let index = 1;

    if (startTyping) {
      setIsTyping(true);
      /*
      playAudio(); // Start the typing sound
      */

      const typingInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text[index - 1]);
          index++;
        } else {
          setIsTyping(false); // Stop typing
          stopAudio(); // Stop sound
          clearInterval(typingInterval);
        }
      }, speed);

      return () => {
        clearInterval(typingInterval);
        stopAudio(); // Ensure sound stops on cleanup
      };
    } else {
      resetTyping(); // Reset typing when user scrolls out
    }
  }, [text, speed, startTyping]);

  return (
    <div className="flex items-center justify-center text-center font-bold text-white text-2xl xl:text-4xl">
      <p>
        <span>{displayedText}</span>
        <span className={`ml-1 border-r-2 border-white ${!isTyping ? 'animate-blink' : ''}`}>|</span>
      </p>
      <audio ref={audioRef} src="/keyboardsound.mp3" preload="auto"></audio>
    </div>
  );
};

const Joinsection = () => {
  const sectionRef = useRef(null);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartTyping(true); // Start typing animation when the section is in view
        } else {
          setStartTyping(false); // Stop typing animation when the section is out of view
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is in view
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-black text-white py-2">
      <div className="container mx-auto py-4 md:py-8 md:px-12 lg:px-16 sm:px-6 px-3">
        <p className="lg:text-lg md:text-md sm:text-md text-sm xl:text-xl text-center text-gray-400">
          Join us to explore new ideas, meet like-minded individuals, and take your first steps toward building a successful business. Whether you're interested in finance, technology, product development, or social entrepreneurship, there's a place for you at the Innovation Cell.
        </p>

        {/* Use the TypingText component for the animated text */}
        <div className="pt-8 text-center justify-center pb-4">
          <TypingText text="TTogether, Let's Innovate and make a difference.." speed={100} startTyping={startTyping} />
        </div>

        <hr className="mt-10 sm:border-t-2 md:border-t-3" />
      </div>
    </section>
  );
};


export default AboutUs;