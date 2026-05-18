const GA_MEASUREMENT_ID = "G-C0PHWVSHPL";

const sendAnalyticsEvent = (eventName, eventParameters = {}) => {
  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, eventParameters);
};

const getPagePath = () => {
  if (window.BIRD_CURRENT_POST) {
    return `/posts/${window.BIRD_CURRENT_POST.slug}`;
  }

  return `${window.location.pathname}${window.location.search}`;
};

const getContentGroup = () => {
  if (window.BIRD_CURRENT_POST) {
    return "Bird Posts";
  }

  if (window.location.pathname.endsWith("/about.html")) {
    return "About";
  }

  return "Archive";
};

const trackPageView = () => {
  const pagePath = getPagePath();

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    page_path: pagePath,
    content_group: getContentGroup(),
  });

  if (window.BIRD_CURRENT_POST) {
    sendAnalyticsEvent("post_view", {
      post_slug: window.BIRD_CURRENT_POST.slug,
      post_title: window.BIRD_CURRENT_POST.title,
      post_location: window.BIRD_CURRENT_POST.location,
      post_year: window.BIRD_CURRENT_POST.year,
      page_path: pagePath,
    });
  }
};

window.addEventListener("DOMContentLoaded", trackPageView);
