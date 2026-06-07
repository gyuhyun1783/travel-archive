const trips = [
  {
    id: "jeju",
    name: "제주",
    region: "Korea",
    date: "2025",
    status: "visited",
    description: "바다와 숲이 함께 있던 여행",
    cover: "images/jeju/cover.jpg",
    photos: [
      "images/jeju/01.jpg",
      "images/jeju/02.jpg",
      "images/jeju/03.jpg"
    ]
  },
  {
    id: "busan",
    name: "부산",
    region: "Korea",
    date: "2024",
    status: "visited",
    description: "도시와 바다가 가까웠던 여행",
    cover: "images/busan/cover.jpg",
    photos: [
      "images/busan/01.jpg",
      "images/busan/02.jpg"
    ]
  },
  {
    id: "tokyo",
    name: "도쿄",
    region: "Japan",
    date: "예정",
    status: "planned",
    description: "나중에 사진을 추가할 여행지",
    cover: "",
    photos: []
  }
];

const tripListView = document.querySelector("#trip-list-view");
const galleryView = document.querySelector("#gallery-view");
const tripGrid = document.querySelector("#trip-grid");
const tripCount = document.querySelector("#trip-count");
const filterButtons = document.querySelectorAll(".filter-button");
const backButton = document.querySelector("#back-button");
const galleryTitle = document.querySelector("#gallery-title");
const galleryMeta = document.querySelector("#gallery-meta");
const galleryDescription = document.querySelector("#gallery-description");
const galleryGrid = document.querySelector("#gallery-grid");
const lightbox = document.querySelector("#lightbox");
const lightboxFrame = document.querySelector(".lightbox-frame");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxClose = document.querySelector("#lightbox-close");
const lightboxPrev = document.querySelector("#lightbox-prev");
const lightboxNext = document.querySelector("#lightbox-next");

let currentFilter = "all";
let currentTrip = null;
let currentPhotoIndex = 0;

function statusLabel(status) {
  return status === "visited" ? "방문한 곳" : "곧 추가 예정";
}

function createImage(src, alt) {
  const img = document.createElement("img");
  img.alt = alt;
  img.loading = "lazy";

  if (!src) {
    img.classList.add("is-missing");
    return img;
  }

  img.src = src;
  img.addEventListener("error", () => {
    img.classList.add("is-missing");
    img.removeAttribute("src");
  });

  return img;
}

function renderTrips() {
  const visibleTrips = trips.filter((trip) => currentFilter === "all" || trip.status === currentFilter);
  tripGrid.innerHTML = "";
  tripCount.textContent = `${visibleTrips.length}개의 여행지`;

  visibleTrips.forEach((trip) => {
    const card = document.createElement("button");
    card.className = "trip-card";
    card.type = "button";
    card.setAttribute("aria-label", `${trip.name} 사진 보기`);

    const imageWrap = document.createElement("div");
    imageWrap.className = "image-wrap";
    imageWrap.dataset.placeholder = trip.status === "planned" ? "Coming soon" : "사진 준비 중";
    imageWrap.appendChild(createImage(trip.cover, `${trip.name} 대표 사진`));

    const body = document.createElement("div");
    body.className = "trip-body";

    const topline = document.createElement("div");
    topline.className = "trip-topline";
    topline.innerHTML = `
      <span class="pill ${trip.status === "planned" ? "planned" : ""}">${statusLabel(trip.status)}</span>
      <span class="muted">${trip.region} · ${trip.date}</span>
    `;

    const title = document.createElement("h3");
    title.textContent = trip.name;

    const description = document.createElement("p");
    description.className = "trip-description";
    description.textContent = trip.description;

    body.append(topline, title, description);

    if (trip.status === "planned") {
      const soon = document.createElement("p");
      soon.className = "soon";
      soon.textContent = "곧 추가 예정";
      body.appendChild(soon);
    }

    card.append(imageWrap, body);
    card.addEventListener("click", () => showGallery(trip.id));
    tripGrid.appendChild(card);
  });
}

function showTripList() {
  galleryView.classList.remove("is-active");
  tripListView.classList.add("is-active");
  closeLightbox();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showGallery(tripId) {
  currentTrip = trips.find((trip) => trip.id === tripId);
  if (!currentTrip) return;

  tripListView.classList.remove("is-active");
  galleryView.classList.add("is-active");
  galleryTitle.textContent = currentTrip.name;
  galleryMeta.textContent = `${currentTrip.region} · ${currentTrip.date} · ${statusLabel(currentTrip.status)}`;
  galleryDescription.textContent = currentTrip.description;
  renderGallery();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderGallery() {
  galleryGrid.innerHTML = "";

  if (!currentTrip.photos.length) {
    const empty = document.createElement("div");
    empty.className = "empty-gallery";
    empty.textContent = "아직 등록된 사진이 없습니다. images 폴더에 사진을 넣고 script.js의 photos 배열에 경로를 추가해 주세요.";
    galleryGrid.appendChild(empty);
    return;
  }

  currentTrip.photos.forEach((photo, index) => {
    const item = document.createElement("button");
    item.className = "gallery-item";
    item.type = "button";
    item.setAttribute("aria-label", `${currentTrip.name} 사진 ${index + 1} 크게 보기`);

    const imageWrap = document.createElement("div");
    imageWrap.className = "image-wrap";
    imageWrap.dataset.placeholder = "사진 준비 중";
    imageWrap.appendChild(createImage(photo, `${currentTrip.name} 사진 ${index + 1}`));

    item.appendChild(imageWrap);
    item.addEventListener("click", () => openLightbox(index));
    galleryGrid.appendChild(item);
  });
}

function openLightbox(index) {
  if (!currentTrip || !currentTrip.photos.length) return;

  currentPhotoIndex = index;
  updateLightboxImage();
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxFrame.classList.remove("is-missing");
  lightboxImage.removeAttribute("src");
}

function updateLightboxImage() {
  const photo = currentTrip.photos[currentPhotoIndex];
  lightboxFrame.classList.remove("is-missing");
  lightboxImage.classList.remove("is-missing");
  lightboxImage.src = photo;
  lightboxImage.alt = `${currentTrip.name} 사진 ${currentPhotoIndex + 1}`;
  lightboxCaption.textContent = `${currentTrip.name} · ${currentPhotoIndex + 1} / ${currentTrip.photos.length}`;
}

function moveLightbox(direction) {
  const total = currentTrip.photos.length;
  currentPhotoIndex = (currentPhotoIndex + direction + total) % total;
  updateLightboxImage();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    renderTrips();
  });
});

backButton.addEventListener("click", showTripList);
lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => moveLightbox(-1));
lightboxNext.addEventListener("click", () => moveLightbox(1));

lightboxImage.addEventListener("error", () => {
  lightboxFrame.classList.add("is-missing");
  lightboxImage.classList.add("is-missing");
  lightboxImage.removeAttribute("src");
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});

renderTrips();
