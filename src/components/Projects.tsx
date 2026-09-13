import { FaArrowCircleRight } from "react-icons/fa";
import ProjectCard, { type Project } from "./ProjectCard";
import Stars from "./Stars";
import projectsData from "../data/projects.json";

// Project metadata is bundled at build time (refresh with `npm run sync:projects`)
// instead of fetching 100 repos from the GitHub API on every page view.
const projects = projectsData as Project[];

const Projects = () => {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="heading-wrapper">
          <h2 className="section-heading">Projects</h2>
        </div>
        <div className="row">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="view-more-wrapper">
          <a
            className="btn view-more"
            href="https://github.com/ksuthar21?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Stars count={10} style={{ zIndex: 1 }} width={165} height={50} />
            <span>View More</span>
            <FaArrowCircleRight />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
