"use server";

import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';

interface PageProps {
  params: { id: string }
}

export default async function ProjectPage({ params }: PageProps) {
  const  {id}  = params;

  async function getProject() {
    const project = await prisma.skill.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!project) {
      notFound();
    }
    return project;
  }

  const project = await getProject();
  return (
    <div>
      <h1>Proje ID: {id}</h1>
      <p>Proje Adı: {project.name}</p>
      <p>Proje Açıklaması: {project.description}</p>
      <p>Proje Resmi: {project.image}</p>
    </div>
  );
}