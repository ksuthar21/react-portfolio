import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Stars from "./Stars";
import { FaArrowCircleRight } from "react-icons/fa";
import myProjects from "../utils/myProjects.ts";

const githubEndpoint =
  "https://api.github.com/users/ksuthar21/repos?sort=date&per_page=100";
const accessToken = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;

const Projects = () => {
  const [projects, setProjects] = useState<Record<string, string>[]>([]);

  useEffect(() => {
    (() => {
      const headers: Record<string, string> = {};
      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      fetch(githubEndpoint, { headers })
        .then((res) => res.json())
        .then((json) => Array.isArray(json) && setProjects(json))
        .catch((error) => console.log(error));
    })();
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="heading-wrapper">
          <h2 className="section-heading">Projects</h2>
        </div>
        <div className="row">
          {!projects.length && (
            <>
              <ProjectCard project={{ language: " " }} skeleton={true} />
              <ProjectCard project={{ language: " " }} skeleton={true} />
              <ProjectCard project={{ language: " " }} skeleton={true} />
            </>
          )}

          {projects.length > 0 &&
            myProjects.map(({ id, thumbnails, techs }) => {
              const project = projects.find(
                (project) => Number(project.id) === id
              );
              return (
                <ProjectCard
                  key={id}
                  project={project}
                  thumbnail={thumbnails}
                  techs={techs}
                />
              );
            })}
        </div>

        <center>
          <a
            className="btn view-more"
            href="https://github.com/ksuthar21?tab=repositories"
            target="_new"
          >
            <Stars count={10} style={{ zIndex: 1 }} width={165} />
            <span>View More</span>
            <FaArrowCircleRight />
          </a>
        </center>
      </div>
    </section>
  );
};

export default Projects;
