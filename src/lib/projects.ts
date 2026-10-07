import rawProjects from "@/data/projects.json";

type RawTechnology = {
  name: string;
  logo: string;
};

type RawProject = {
  id: number;
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  mainImage: string;
  about: string;
  sneakPeekImages: string[];
  technologies: RawTechnology[];
};

type RawProjectData = {
  webDesign: RawProject[];
  webDev: RawProject[];
  appDev: RawProject[];
};

export type ProjectTechnology = {
  name: string;
  logo: string;
};

export type ProjectCategoryKey = "webDesign" | "webDev" | "appDev";

export type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  mainImage: string;
  about: string;
  sneakPeekImages: string[];
  technologies: ProjectTechnology[];
  categoryKey: ProjectCategoryKey;
  categoryLabel: string;
};

export const projectTabs: Array<{
  key: ProjectCategoryKey;
  label: string;
}> = [
  { key: "webDesign", label: "Web Design" },
  { key: "webDev", label: "Web Development" },
  { key: "appDev", label: "App Development" },
];

const categoryLabels: Record<ProjectCategoryKey, string> = {
  webDesign: "Web Design",
  webDev: "Web Development",
  appDev: "App Development",
};

const fallbackTechLogo = "/images/home/technology/frontend/react.svg";

const normalizeLogo = (logo: string) => {
  if (logo === "/images/home/technology/backend/nest.png") {
    return "/images/home/technology/backend/nestjs.png";
  }

  if (logo === "/images/home/technology/fullstack/mern.svg") {
    return fallbackTechLogo;
  }

  return logo;
};

const normalizeSneakPeekImages = (project: RawProject) =>
  project.sneakPeekImages.map((image) => {
    if (image.includes("/wyzepay/wyzepay")) {
      return project.heroImage;
    }

    return image;
  });

const projectData = rawProjects as RawProjectData;

export const allProjects: Project[] = projectTabs.flatMap(({ key }) =>
  projectData[key].map((project) => ({
    ...project,
    categoryKey: key,
    categoryLabel: categoryLabels[key],
    sneakPeekImages: normalizeSneakPeekImages(project),
    technologies: project.technologies.map((technology) => ({
      ...technology,
      logo: normalizeLogo(technology.logo),
    })),
  })),
);

export const projectsByCategory = projectTabs.reduce(
  (accumulator, { key }) => {
    accumulator[key] = allProjects.filter((project) => project.categoryKey === key);
    return accumulator;
  },
  {} as Record<ProjectCategoryKey, Project[]>,
);

export const getProjectBySlug = (slug: string) =>
  allProjects.find((project) => project.slug === slug);
