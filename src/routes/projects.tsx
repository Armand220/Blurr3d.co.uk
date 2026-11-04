import { createFileRoute, Link } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import { marked } from 'marked'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import { Window, useReveal } from '@/components/site/Chrome'
import { trackSpotlight } from '@/lib/site'

export const Route = createFileRoute('/projects')({
  head: () => ({ meta: [{ title: 'Projects | BLURRED' }] }),
  component: Projects,
})

function Projects() {
  useReveal()

  return (
    <div className="page">
      <div className="container">
        <header className="page-head" data-reveal>
          <div className="eyebrow">Projects</div>
          <h1 className="h1">
            Selected <span className="gold">work.</span>
          </h1>
          <p className="lede">
            Experiments and builds, each one a step up from the last. Built with the same dark,
            deliberate style you see across the site.
          </p>
        </header>

        <div className="project-list">
          {allProjects.map((p, i) => (
            <Window
              key={p._meta.path}
              title={`${p._meta.path}.app`}
              className="project"
              data-reveal
              onPointerMove={trackSpotlight}
            >
              <div className="project-grid">
                <div>
                  <span className="work-index">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="project-title">{p.title}</h2>
                  <p className="project-desc">{p.description}</p>
                </div>
                <div className="project-side">
                  {p.content && (
                    <div className="prose-dark" dangerouslySetInnerHTML={{ __html: marked.parse(p.content) as string }} />
                  )}
                  <div className="tags">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="project-actions">
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        <ExternalLink size={14} /> Visit site
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                        <Github size={14} /> Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Window>
          ))}

          <div className="work-item work-soon" data-reveal>
            <span className="work-index">{String(allProjects.length + 1).padStart(2, '0')}</span>
            <div className="work-main">
              <h3 className="work-title">More on the way</h3>
              <p className="work-desc">New projects land here as they ship.</p>
            </div>
            <span className="soon-pill">Soon</span>
          </div>
        </div>

        <div className="page-cta" data-reveal>
          <p>Want to build something together or have a question about a project?</p>
          <Link to="/contact" className="btn btn-ghost">
            Get in touch <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
