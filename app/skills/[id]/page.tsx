/* eslint-disable @typescript-eslint/no-explicit-any */


import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import type { Metadata } from 'next';
import Image from 'next/image';

export async function generateStaticParams() {
  const projects = await prisma.skill.findMany();
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}


export async function generateMetadata({ params }: any): Promise<Metadata> {
  return {
    title: `Proje ${params.id}`,
  };
}


export default async function ProjectPage({ params }: any) {
  const id = parseInt(params.id);

  if (isNaN(id)) notFound();

  const project = await prisma.skill.findUnique({
    where: { id },
  });

  if (!project) notFound();

  return (
    <div className="project">
      <p className="projectName">{project.name}</p>
      <div className="projectCenter">
        <div className="image"><Image src={project.image} alt={project.name} width={100} height={100} className='projectImg' /></div>
        <div className="texts">
                <p className="projectName">{project.name}</p>
                <p>{project.description}</p>
        </div>
      </div>
      

    </div>
  );
}
