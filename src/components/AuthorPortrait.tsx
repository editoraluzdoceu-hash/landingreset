import { useState } from 'react';
import { founder } from '../data/content';

// Espaço para a foto do autor na seção "Quem criou".
// A foto é carregada de founder.photo.src (public/images/author/…).
// Se o arquivo ainda não existir, exibe um espaço reservado com a inicial do nome.
export default function AuthorPortrait() {
  const [missing, setMissing] = useState(false);

  return (
    <figure className="author-portrait">
      <div className={`author-portrait-frame${missing ? ' is-placeholder' : ''}`}>
        {missing ? (
          <div className="author-portrait-placeholder" aria-hidden="true">
            <span className="author-portrait-monogram">{founder.name.charAt(0)}</span>
            <span className="author-portrait-hint">Foto do autor</span>
          </div>
        ) : (
          <img
            src={founder.photo.src}
            alt={founder.photo.alt}
            width={600}
            height={750}
            loading="lazy"
            decoding="async"
            onError={() => setMissing(true)}
          />
        )}
      </div>
      <figcaption className="author-portrait-caption">{founder.photo.caption}</figcaption>
    </figure>
  );
}
