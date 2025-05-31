import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';

export default async function ProjectPage({ params }: any) {
  const id = parseInt(params.id);
  if (isNaN(id)) notFound();

  const project = await prisma.skill.findUnique({ where: { id } });
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