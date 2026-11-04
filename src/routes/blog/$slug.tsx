import { createFileRoute, Link } from '@tanstack/react-router'
import { allBlogs } from 'content-collections'
import { marked } from 'marked'
import { ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPost,
})

function BlogPost() {
  const { slug } = Route.useParams()
  const post = allBlogs.find((p) => p._meta.path === slug)

  if (!post) {
    return (
      <div className="page">
        <div className="container narrow">
          <div className="eyebrow">404</div>
          <h1 className="h1">Post not found.</h1>
          <Link to="/" className="btn btn-ghost">
            <ArrowLeft size={14} /> Back home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <article className="container narrow">
        <Link to="/" className="back-link">
          <ArrowLeft size={14} /> Back home
        </Link>
        <header className="page-head">
          <div className="eyebrow">
            {new Date(post.date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
            · {post.author}
          </div>
          <h1 className="h1">{post.title}</h1>
          <div className="tags">
            {post.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </header>
        <div className="prose-dark" dangerouslySetInnerHTML={{ __html: marked.parse(post.content) as string }} />
      </article>
    </div>
  )
}
