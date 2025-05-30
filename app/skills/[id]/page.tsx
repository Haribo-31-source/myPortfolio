import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';

interface Params {
  params: { id: string }
}

export default async function ProjectPage({ params }: Params) {
  const  {id}  = params;

  async function getProject() {
    "use server";
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