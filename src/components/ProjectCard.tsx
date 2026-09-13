export type Project = {
  id: number;
  name: string;
  description: string;
  homepage: string;
  html_url: string;
  thumbnails: { front: string; back: string };
  techs: string[];
};

type Props = {
  project: Project;
};

// Intrinsic size of the WebP thumbnails in public/images (see scripts/optimize-images.sh).
const THUMB_WIDTH = 1000;
const THUMB_HEIGHT = 511;

const externalLink = { target: "_blank", rel: "noopener noreferrer" } as const;

const ProjectCard = ({ project }: Props) => {
  const { name, description, homepage, html_url, thumbnails, techs } = project;
  const title = name.replaceAll("-", " ");

  return (
    <article className="col project-card">
      <figure className="thumbnail">
        <img
          className="front"
          src={thumbnails.front}
          alt={`${title} screenshot`}
          width={THUMB_WIDTH}
          height={THUMB_HEIGHT}
          loading="lazy"
          decoding="async"
        />
        <img
          className="back"
          src={thumbnails.back}
          alt=""
          aria-hidden="true"
          width={THUMB_WIDTH}
          height={THUMB_HEIGHT}
          loading="lazy"
          decoding="async"
        />

        <div className="links">
          {homepage && (
            <a href={homepage} className="link" {...externalLink}>
              Demo
            </a>
          )}
          {html_url && (
            <a href={html_url} className="link" {...externalLink}>
              Github
            </a>
          )}
        </div>
      </figure>
      <div className="details">
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
        <div className="techs">
          {techs.map((tech) => (
            <span key={tech} className="language">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
