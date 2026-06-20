import { createFileRoute } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { ExternalLink, Github } from 'lucide-react'

export const Route = createFileRoute('/projects')({
  component: Projects,
})

function Projects() {
  return (
    <>
      <style>{`
        .projects-shell {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
        }

        .projects-wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 3rem 1rem;
        }

        .projects-card {
          max-width: 960px;
          width: 100%;
          margin: 0 auto;
          background: rgba(14,14,18,0.72);
          border: 1px solid var(--border);
          border-radius: 12px;
          backdrop-filter: blur(18px) saturate(140%);
          box-shadow: 0 30px 80px -20px rgba(0,0,0,0.8);
          overflow: hidden;
        }

        .projects-titlebar {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          height: 38px;
          padding: 0 1rem;
          background: linear-gradient(180deg, rgba(38,38,48,0.9), rgba(26,26,34,0.9));
          border-bottom: 1px solid rgba(0,0,0,0.5);
          user-select: none;
        }

        .projects-lights {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .projects-light {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          position: relative;
          box-shadow: inset 0 0 0 0.5px rgba(0,0,0,0.35);
        }

        .projects-light.close { background: #ff5f57; }
        .projects-light.min { background: #febc2e; }
        .projects-light.max { background: #28c840; }

        .projects-title {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.16em;
          color: var(--text);
          text-transform: uppercase;
        }

        .projects-body {
          padding: 2.5rem 2rem 2.25rem;
        }

        .projects-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          padding: 0.5rem 0.7rem;
          border: 1px solid rgba(212,178,90,0.22);
          background: rgba(212,178,90,0.06);
          color: var(--accent-bright);
          font-family: var(--font-mono);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .project-item {
          border: 1px solid var(--border);
          background: rgba(8,8,12,0.72);
          padding: 1.25rem;
          min-height: 220px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .project-head {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          align-items: start;
        }

        .project-name {
          margin: 0;
          font-family: var(--font-display);
          font-size: 1.35rem;
          line-height: 1.1;
          color: var(--text);
        }

        .project-desc {
          margin: 0;
          color: var(--text);
          line-height: 1.7;
          font-size: 0.92rem;
          flex: 1;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .project-tag {
          padding: 0.35rem 0.55rem;
          border: 1px solid rgba(212,178,90,0.18);
          color: var(--accent-bright);
          background: rgba(212,178,90,0.06);
          font-family: var(--font-mono);
          font-size: 0.55rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .project-links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #fff;
          text-decoration: none;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .project-link:hover {
          color: var(--accent-bright);
          transform: translateY(-1px);
        }

        .project-link svg {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }

        @media (max-width: 760px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }

          .projects-body {
            padding: 2rem 1.25rem;
          }
        }
      `}</style>

      <div className="projects-shell">
        <div className="projects-wrap">
          <div className="projects-card">
            <div className="projects-titlebar">
              <div className="projects-lights">
                <span className="projects-light close" />
                <span className="projects-light min" />
                <span className="projects-light max" />
              </div>
              <div className="projects-title">projects.app</div>
            </div>

            <div className="projects-body">
              <div className="projects-badge">04 - Projects</div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                  lineHeight: 1,
                  margin: '0 0 0.85rem',
                  color: 'var(--text)',
                }}
              >
                Selected work.
              </h1>
              <p
                style={{
                  maxWidth: '46rem',
                  margin: 0,
                  color: 'var(--text)',
                  lineHeight: 1.8,
                  fontSize: '0.95rem',
                }}
              >
                A selection of projects built with the same dark, deliberate
                style used across the site.
              </p>

              <div className="projects-grid">
                {allProjects.map((project) => (
                  <article key={project._meta.path} className="project-item">
                    <div className="project-head">
                      <h2 className="project-name">{project.title}</h2>
                    </div>
                    <p className="project-desc">{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          <Github size={16} />
                          GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          <ExternalLink size={16} />
                          Website
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
