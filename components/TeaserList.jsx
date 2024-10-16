export default function TeaserList({ content }) {
    return (
      <div>
        {content.teasers.map((teaser) => (
          <div key={teaser.title}>
            <a href={teaser.href}>
              <img src={teaser.image.src} alt={teaser.image.alt} />
              <h3>{teaser.title}</h3>
            </a>
          </div>
        ))}
      </div>
    );
  }