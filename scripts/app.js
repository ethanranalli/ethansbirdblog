const postsList = document.querySelector("#posts-list");
const getPostImages = (post) => (post.images && post.images.length ? post.images : [post.image]);
const getDisplayImage = (post) => post.displayImage || getPostImages(post)[0];

const groupedPosts = window.BIRD_POSTS.reduce((years, post) => {
  if (!years[post.year]) {
    years[post.year] = [];
  }

  years[post.year].push(post);
  return years;
}, {});

const years = Object.keys(groupedPosts).sort((left, right) => Number(right) - Number(left));

const renderPostCard = (post) => `
  <article class="archive-item">
    <a
      class="archive-item__image-link"
      href="post.html?slug=${post.slug}"
      aria-label="Open ${post.title}"
    >
      <img
        class="archive-item__image"
        src="${encodeURI(getDisplayImage(post))}"
        alt="${post.alt}"
        loading="lazy"
        decoding="async"
      />
    </a>
    <h2 class="archive-item__title">
      <a href="post.html?slug=${post.slug}">${post.title}</a>
    </h2>
    <p class="archive-item__meta">${post.location} / ${post.date}</p>
  </article>
`;

postsList.innerHTML = years
  .map(
    (year) => `
      <p class="archive-year">${year}</p>
      ${groupedPosts[year].map((post) => renderPostCard(post)).join("")}
    `
  )
  .join("");
