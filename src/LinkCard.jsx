function LinkCard({ link, index, total }) {
  const { title, description, url, tag, image, color } = link;

  const background = image
    ? `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.75) 100%), url(${image})`
    : `linear-gradient(160deg, ${color || "#333"} 0%, #0b0b0f 100%)`;

  return (
    <section className="card" style={{ backgroundImage: background }}>
      <div className="card-progress">
        {index + 1} / {total}
      </div>

      <div className="card-content">
        {tag && <span className="card-tag">{tag}</span>}
        <h2 className="card-title">{title}</h2>
        {description && <p className="card-description">{description}</p>}

        <a
          className="card-button"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open link
        </a>
      </div>
    </section>
  );
}

export default LinkCard;
