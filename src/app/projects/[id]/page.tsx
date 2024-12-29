import { Projects } from '../Projects';
import ProjectDisplay from './projectDisplay';

interface ProjectParams {
  id: string;
}

export async function generateStaticParams() {
  return Projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<ProjectParams>;
}) {
  const resolvedParams = await params;
  const project = Projects.find(p => p.id === resolvedParams.id);

  if (!project) {
    return <p>Project not found</p>;
  }
  return <ProjectDisplay project={project} />;
}