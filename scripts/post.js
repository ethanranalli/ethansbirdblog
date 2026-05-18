const postDetail = document.querySelector("#post-detail");
const searchParams = new URLSearchParams(window.location.search);
const slug = searchParams.get("slug");
const getPostImages = (entry) => (entry.images && entry.images.length ? entry.images : [entry.image]);

const post = window.BIRD_POSTS.find((entry) => entry.slug === slug);

if (!post) {
  postDetail.innerHTML = `
    <p class="post-detail__empty">Post not found.</p>
    <p class="post-detail__empty">
      <a class="post-detail__back" href="index.html">Back to archive</a>
    </p>
  `;
} else {
  document.title = `${post.title} | Ethan's Bird Blog`;
  const images = getPostImages(post);

  postDetail.innerHTML = `
    <a class="post-detail__back" href="index.html">Back to archive</a>
    <div class="post-detail__viewer">
      <div class="post-detail__image-wrap">
        <img
          class="post-detail__image"
          src="${encodeURI(images[0])}"
          alt="${post.alt}"
          decoding="async"
          data-post-image
        />
        <button
          class="post-detail__nav post-detail__nav--left"
          type="button"
          aria-label="Previous photo"
          data-post-prev
        ></button>
        <button
          class="post-detail__nav post-detail__nav--right"
          type="button"
          aria-label="Next photo"
          data-post-next
        ></button>
      </div>
      <p class="post-detail__count" data-post-count>1 / ${images.length}</p>
    </div>
    <h2 class="post-detail__title">${post.title}</h2>
    <p class="post-detail__meta">${post.location} / ${post.date}</p>
    <div class="post-detail__body">
      ${post.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}
    </div>
  `;

  if (images.length > 1) {
    const imageElement = postDetail.querySelector("[data-post-image]");
    const countElement = postDetail.querySelector("[data-post-count]");
    const previousButton = postDetail.querySelector("[data-post-prev]");
    const nextButton = postDetail.querySelector("[data-post-next]");
    let currentImageIndex = 0;

    const renderImage = (index) => {
      currentImageIndex = (index + images.length) % images.length;
      imageElement.src = encodeURI(images[currentImageIndex]);
      countElement.textContent = `${currentImageIndex + 1} / ${images.length}`;
    };

    previousButton.addEventListener("click", () => {
      renderImage(currentImageIndex - 1);
    });

    nextButton.addEventListener("click", () => {
      renderImage(currentImageIndex + 1);
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        renderImage(currentImageIndex - 1);
      }

      if (event.key === "ArrowRight") {
        renderImage(currentImageIndex + 1);
      }
    });
  }
}
