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

export async function generateMetadata(props: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Project ${props.params.id}`,
  };
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);

  if (isNaN(id)) notFound();

  const project = await prisma.skill.findUnique({
    where: { id },
  });

  if (!project) notFound();

  return (
    <div>
      <h1>Proje ID: {id}</h1>
      <p>Proje Adı: {project.name}</p>
      <p>Proje Açıklaması: {project.description}</p>
      <Image src={project.image} alt={project.name} width={100} height={100}></Image>
    </div>
  );
}