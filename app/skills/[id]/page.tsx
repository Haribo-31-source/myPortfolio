import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';

export default async function ProjectPage({ 
  params 
}: {
  params: { id: string }
}) {
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

// Eğer statik üretim yapacaksanız (opsiyonel)
export async function generateStaticParams() {
  const projects = await prisma.skill.findMany();
  
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}