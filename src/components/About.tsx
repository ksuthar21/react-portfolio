import Stars from "./Stars";
import { AVATAR_URL } from "../utils/constants";

const skills = [
  { name: "JavaScript", percent: 90 },
  { name: "TypeScript", percent: 75 },
  { name: "ReactJS", percent: 90 },
  { name: "NodeJS", percent: 70 },
  { name: "CSS", percent: 85 },
  { name: "MongoDB", percent: 65 },
  //   { name: "Java", percent: 60 },
  //   { name: "Firebase", percent: 70 },
  { name: "MySQL", percent: 95 },
  // { name: "PHP", percent: 80 },
  { name: "WordPress", percent: 75 },
];

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <Stars count={100} />
        <div className="row">
          <div className="col">
            <div className="profile">
              <img
                src={AVATAR_URL}
                alt="Kiran Suthar"
                width={200}
                height={200}
                loading="lazy"
                decoding="async"
              />
            </div>

            <ul className="skills">
              {skills.map((skill, i) => (
                <li className="skill-item" key={i}>
                  <div className="skill-data">
                    <span className="skill-name">{skill.name}</span>
                    {/* <span className="skill-percent">{skill.percent}%</span> */}
                  </div>
                  <div
                    className="progress"
                    style={{ width: `${skill.percent}%` }}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="col">
            <h3 className="title">About Me</h3>
            <div className="info">
              <p>
                A software engineer with a passion for turning concepts into
                tangible outcomes through coding. I am enthusiastic about
                utilizing JavaScript to craft exceptional user experiences.
              </p>
              <p>
                Bringing two years of expertise in web development, harnessing
                the latest front-end and back-end technologies for optimal
                results.
              </p>
              <p>
                Enthusiastic developer driven to create interactive websites
                using ReactJS, JavaScript, HTML5, and SASS. Possessing robust
                collaboration skills and a demonstrated track record in web
                application development, with proficiency in WordPress and
                MySQL.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
