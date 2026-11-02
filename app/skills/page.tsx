"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { motion } from "framer-motion"
import axios from "axios";
import SkillsSkeleton from "./SkillsSkeleton";

type Skill = {
  id: number;
  name: string;
  description: string;
  image: string;
};

const container = {
  visible: {
    transition: {
      staggerChildren: 0.15
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
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function getSkill() {
      try {
        const res = await axios.get("/skills/get");
        setSkills(res.data as Skill[]);
      } catch (error: unknown) {
        console.error("Yetenekler yüklenemedi:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getSkill();
  }, []);

  if (isLoading) {
    return <SkillsSkeleton />;
  }

  if (hasError) {
    return <p className="skillsError" role="alert">Yetenekler yüklenirken bir hata oluştu.</p>;
  }

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