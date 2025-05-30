import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import type { Metadata } from 'next';

// @ts-ignore

export async function generateStaticParams() {
  const projects = await prisma.skill.findMany();
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Project ${params.id}`,
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
      <p>Proje Resmi: {project.image}</p>
    </div>
  );
}