"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { motion } from "framer-motion"
import axios from "axios";

type Skill = {
  id: number;
  name: string;
  description: string;
  image: string;
};

const container = {
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
}

export default function Page() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    async function getSkill() {
      const res = await axios.get("http://localhost:3000/skills/get");
      setSkills(res.data as Skill[]);
    }
    getSkill();
  }, []);

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="skills">
        {skills.map((skill) => (
          <motion.div
            variants={item}
            initial="hidden"
            animate="visible"
            key={skill.id} className="skill">
            <Link href={'/skills/[id]'} as={`/skills/${skill.id}`}>
              <h2>{skill.name}</h2>
              <p>{skill.description}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </>
  )
}