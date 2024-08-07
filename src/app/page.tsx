"use client";

import { useCallback, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";

import Input from "@/components/Input";
import Button from "@/components/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

import introImg from "@/assets/intro.jpeg";

import mealMateImg from "@/assets/meal-mate.jpg";
import bookstoreImg from "@/assets/bookstore.jpg";
import reactChatterImg from "@/assets/react-chatter.jpg";

import uniqid from "uniqid";

import { emailPattern } from "@/lib/constants";

import { useForm, ValidationError } from "@formspree/react";
import TextArea from "@/components/TextArea";

import { motion, useScroll, AnimatePresence } from "framer-motion";

const projects = [
  {
    name: "Meal Mate AI",
    link: "https://meal-mate-ai.vercel.app/",
    description: "A team project for generating smart recipes powered by AI.",
    image: mealMateImg,
  },
  {
    name: "Bookstore",
    link: "https://bookstore-f3276.firebaseapp.com/",
    description:
      "A web application that provides content for best-selling books according to New York Times.",
    image: bookstoreImg,
  },
  {
    name: "React Chatter",
    link: "https://github.com/eugenechevski/react-chatter",
    description:
      "A dynamic and feature-rich mobile messaging app built with React Native.",
    image: reactChatterImg,
  },
];

const sentence = "Hey, I'm Yauheni👋";
const letters = sentence.split("");

export default function Page() {
  const router = useRouter();
  const [state, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_FRONT_PAGE_FORM
  );

  const { scrollYProgress } = useScroll();
  const [scrollY, setScrollY] = useState(0);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Navigate to the success page if the form was submitted successfully
  if (state.succeeded) {
    router.push("/success");
  }

  const onScroll = useCallback((e) => {
    const { scrollY } = window;
    setScrollY(scrollY);
  }, []);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return (
    <motion.main
      className="primary-page"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 1,
      }}
    >
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="progress-bar"
      />
      {scrollY > 100 && (
        <motion.div
          className={`primary-icon fixed left-3 top-3 translate-y-[90vh] cursor-pointer`}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 1,
          }}
        >
          <FontAwesomeIcon icon={faArrowUp} size="2x" onClick={scrollTop} />
        </motion.div>
      )}
      <motion.nav
        initial={{
          x: -100,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        exit={{
          x: -100,
          opacity: 0,
        }}
        transition={{
          duration: 1,
        }}
        className="flex w-full p-5 md:p-12 h-12 gap-6"
      >
        <motion.div whileHover={{ scale: 1.1 }}>
          <Link href={"#about"} className="primary-icon">
            About
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Link href={"#projects"} className="primary-icon">
            Projects
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Link href={"#socials"} className="primary-icon">
            Socials
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Link href={"#contact"} className="primary-icon">
            Contact
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} className="hidden">
          <Dropdown
            backdrop="blur"
            closeOnSelect={false}
            className="bg-white text-primary shadow-2xl rounded-xl p-1"
          >
            <DropdownTrigger className="primary-icon">
              <FontAwesomeIcon icon={faPen} size="2x" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="materials">
                <Dropdown placement="left">
                  <DropdownTrigger>Materials</DropdownTrigger>
                  <DropdownMenu>
                    <DropdownSection className="bg-white text-primary shadow-2xl rounded-xl p-2">
                      <DropdownItem key="resume" href="/resume">
                        Resume
                      </DropdownItem>
                      <DropdownItem key="cover-letter" href="/cover-letter">
                        Cover Letter
                      </DropdownItem>
                      <DropdownItem key="mini-interview" href="/mini-interview">
                        Mini Interview
                      </DropdownItem>
                    </DropdownSection>
                  </DropdownMenu>
                </Dropdown>
              </DropdownItem>
              <DropdownItem key="instructions" href="/instructions">
                Instructions
              </DropdownItem>
              <DropdownItem key="Proposal" href="/proposal">
                Proposal
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </motion.div>
      </motion.nav>
      <header className="h-[60vh] lg:h-[100vh] flex flex-col items-center justify-center gap-3 lg:gap-12 lg:mb-12">
        <figure className="rounded-3xl w-[300px] h-[250px] overflow-hidden shadow-2xl drop-shadow-2xl relative">
          <Image
            src={introImg}
            alt="introduction photo"
            sizes="(max-width: 576px) 250px, 500px"
            quality={100}
            priority={true}
            fill
          />
        </figure>
        <h1 className="text-2xl text-center sm:text-4xl font-bold p-5 lg:p-0">
          <AnimatePresence>
            {letters.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </AnimatePresence>
        </h1>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="absolute right-10 top-10"
        >
          <Link
            href={"/blog"}
            className="text-white text-3xl font-sans italic bold"
          >
            ?
          </Link>
        </motion.div>
      </header>
      <section
        id="about"
        className="flex flex-col items-center justify-center gap-12 p-12 mb-12"
      >
        <h1 className="text-3xl text-center sm:text-6xl font-bold">About me</h1>
        <p className="text-sm sm:text-xl font-light lg:w-3/4 drop-shadow-2xl">
          Software engineer with a comprehensive background in full-stack
          development, showcasing expertise in JavaScript, React, and Node.js.
          Proficient in Java, Python, and C, with experience in enhancing AI
          models&apos; performance and developing dynamic web applications.
          Skilled in UI/UX design, system architecture, and effective
          collaboration.
        </p>
        <article className="flex flex-col gap-5 lg:w-3/4">
          <h2 className="self-start font-bold text-2xl">Experience</h2>
          <div className="flex flex-col gap-3">
            <p>
              <strong>Data Annotation</strong>, AI Trainer, Remote, Jan 2024 -
              Present
            </p>
            <ul className="list-inside list-disc flex flex-col gap-1">
              <li>
                Increased models’ truthfulness and correctness by 15% in
                visualization-related tasks
              </li>
              <li>Provided feedback on models’ responses to a prompt</li>
              <li>
                Honed models’ output for coding-related prompts which made them
                produce better code by approximately 20%
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <p>
              <strong>Freelance</strong>, Full-stack developer, Remote, Sep
              2021- Present
            </p>
            <ul className="list-inside list-disc flex flex-col gap-1">
              <li>
                Led the creation of user-friendly web apps using cutting-edge
                tech, delighting clients with seamless experiences.
              </li>
              <li>
                Worked closely with clients to understand needs and deliver
                tailored solutions on time and budget.
              </li>
              <li>
                Kept apps running smoothly by fixing bugs and reviewing code
                with attention to detail.
              </li>
            </ul>
          </div>
        </article>
        <article className="flex flex-col gap-5 lg:w-3/4">
          <h2 className="self-start font-bold text-2xl">Education</h2>
          <div className="flex flex-col gap-3">
            <p>
              <strong>BS in Computer Science</strong>, University of Central
              Florida, Jan 2024 - Present
            </p>
            <ul className="list-inside list-disc flex flex-col gap-1">
              <li>
                Knight Hacks Workshop Team member, a participant of Hackabull,
                Shellhacks, and KnightHacks VII
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <p>
              <strong>AA in Computer Science</strong>, Broward College, Jan 2022
              - Dec 2023
            </p>
            <ul className="list-inside list-disc flex flex-col gap-1">
              <li>
                GPA: 3.8, graduated with highest honors, hit President’s and
                Dean’s lists, was invited to National Honor Society.
              </li>
            </ul>
          </div>
        </article>
        <article className="flex flex-col gap-5 lg:w-3/4">
          <h2 className="self-start font-bold text-2xl">Skills</h2>
          <div className="flex flex-col gap-3">
            <ul className="list-inside list-disc flex flex-col gap-1">
              <li>
                <strong>Core</strong>: Java, Python, C
              </li>
              <li>
                <strong>Web & Mobile</strong>: JavaScript, TypeScript, HTML,
                CSS, React, Node.js, TailwindCSS, React Native
              </li>
              <li>
                <strong>Tools</strong>: Git, GitHub, Figma, Docker, Linux, REST
                APIs, Cloud
              </li>
              <li>
                <strong>Related coursework</strong>: Intro to programming with
                C(A), Computer Science I(A), Object Oriented Programming(A)
              </li>
              <li>
                <strong>Other</strong>: Russian & Belarusian languages(Native),
                Math(completed Calculus I & Calculus II with ‘A’ & ‘B’),
                Customer service(worked as a part-time waiter),
                Communication(took a lead in a several team projects at school),
                Public speaking & Presentations(took two public speaking courses
                in college, taught programming concepts for workshops).
              </li>
            </ul>
          </div>
        </article>
      </section>
      <section
        id="projects"
        className="min-h-[100vh] flex flex-col gap-12 items-center justify-center lg:p-36"
      >
        <h1 className="text-3xl text-center sm:text-6xl font-bold">
          Featured Projects
        </h1>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          {projects.map(({ name, link, description, image }) => (
            <article
              className="flex flex-col items-center justify-center gap-6"
              key={uniqid()}
            >
              <figure className="flex items-center rounded-full w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] shadow-2xl drop-shadow-2xl overflow-hidden">
                <Link className="relative h-full w-full" href={link}>
                  <Image
                    className="rounded-full"
                    src={image}
                    alt="bookstore"
                    quality={100}
                    priority={true}
                    sizes="(max-width: 576px) 150px, 300px"
                    fill
                  />
                </Link>
              </figure>
              <h1 className="text-2xl text-center">{name}</h1>
              <p className="text-md text-center w-3/4">{description}</p>
            </article>
          ))}
        </div>
        <Link href={"https://github.com/eugenechevski"} className="self-center">
          <Button textContent="Explore" />
        </Link>
      </section>
      <section
        id="socials"
        className="flex flex-col items-center justify-center gap-12 lg:min-h-[100vh]"
      >
        <h1 className="text-3xl text-center sm:text-6xl font-bold">
          Social Media
        </h1>
        <div className="flex items-center justify-center gap-12 h-[50vh] lg:h-[60vh]">
          <Link href={"https://www.instagram.com/eugenechevski/"}>
            <FontAwesomeIcon className="w-12" size="3x" icon={faInstagram} />
          </Link>
          <Link
            href={
              "https://www.linkedin.com/in/yauheni-khvashcheuski-181b06263/"
            }
          >
            <FontAwesomeIcon className="w-12" size="3x" icon={faLinkedinIn} />
          </Link>
          <Link href={"https://github.com/eugenechevski"}>
            <FontAwesomeIcon className="w-12" size="3x" icon={faGithub} />
          </Link>
        </div>
      </section>
      <section
        id="contact"
        className="flex flex-col justify-center items-center sm:gap-12"
      >
        <article className="flex flex-col items-center justify-start gap-6 h-[30vh] sm:h-[15vh]">
          <h1 className="text-3xl text-center sm:text-6xl font-bold">
            Contact me
          </h1>
          <p className="text-md h-3/4 text-center sm:text-start">
            If you have any questions, concerns, or offers, feel free to contact
            me through this form or the social media above.
          </p>
        </article>
        <form
          id="contact"
          className="flex flex-col gap-4 sm:w-1/2 lg:w-1/4"
          onSubmit={handleSubmit}
          method="POST"
          name="contact"
        >
          <label className="text-md" htmlFor="first-name">
            First Name
          </label>
          <Input
            id="first-name"
            name="first-name"
            required={true}
            className="w-full"
          />
          <label className="text-md" htmlFor="last-name">
            Last Name
          </label>
          <Input
            id="last-name"
            name="last-name"
            required={true}
            className="w-full"
          />
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            required={true}
            className="w-full"
            pattern={emailPattern}
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <label className="text-md" htmlFor="message">
            Message
          </label>
          <TextArea
            required
            minLength={30}
            maxLength={200}
            id="message"
            rows={10}
            name="message"
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
          <div className="self-center">
            <Button
              textContent="Send"
              type="submit"
              size="md"
              disabled={state.submitting}
            />
          </div>
          <ValidationError errors={state.errors} />
        </form>
      </section>
      <footer className="h-32 flex justify-center items-center">
        <p className="text-center text-md">
          &copy; 2024 Yauheni Khvashcheuski(Eugene Chevski). All rights
          reserved.
        </p>
      </footer>
    </motion.main>
  );
}
