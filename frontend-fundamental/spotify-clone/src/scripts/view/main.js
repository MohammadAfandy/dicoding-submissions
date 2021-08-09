import DataSource from '../data/data-source.js';

const main = () => {
  const menuItemElements = document.querySelectorAll('menu-item');
  const mainContentElement = document.querySelector('main-content');
  const appBarElement = document.querySelector('app-bar');
  const navElement = document.querySelector('nav-bar').querySelector('nav');

  const overlayElement = document.getElementById('overlay');

  const onMenuClick = async (event) => {
    onCloseMobileMenu();
    mainContentElement.loading = true;

    try {
      // set incative all link
      menuItemElements.forEach((menuItem) => {
        menuItem.removeAttribute('active');
      });

      // set active selected link
      const selectedMenuItem = event.currentTarget;
      selectedMenuItem.setAttribute('active', 'active');

      const id = selectedMenuItem.menu.id;
      let type = selectedMenuItem.querySelector('.menu-name').textContent;
      let cardData = [];

      if (id === 'link-playlist') {
        appBarElement.search = false;
        cardData = await DataSource.getPlaylists();
      } else if (id === 'link-new-release') {
        appBarElement.search = false;
        cardData = await DataSource.getNewReleases();
      } else if (id === 'link-search') {
        appBarElement.search = true;
        type = '';
      }

      renderResultCard(type, cardData);
    } catch (error) {
      fallbackResult(error);
    } finally {
      mainContentElement.loading = false;
    }
  };

  let delay;
  const onSearchChange = async () => {
    try {
      if (delay) clearTimeout(delay);

      const searchValue = appBarElement.searchValue;
      if (!searchValue) return;

      delay = setTimeout(async () => {
        mainContentElement.loading = true;
        const searchData = await DataSource.search(searchValue);
        renderResultSearch(searchData);
        mainContentElement.loading = false;
      }, 500);
    } catch (error) {
      fallbackResult(error);
      mainContentElement.loading = false;
    }
  };

  const onSeeAllClick = (event) => {
    const { type, results } = event.target.closest('search-list');
    renderResultCard(type, results);
  };

  const onCardItemClick = async (event) => {
    mainContentElement.loading = true;
    try {
      const cardItemElement = event.currentTarget;
      const card = cardItemElement.card;

      const { id, type } = card;
      const trackData = await DataSource.getTracks(id, `${type}s`);

      renderResultTrack(card, trackData);
    } catch (error) {
      fallbackResult(error);
    } finally {
      mainContentElement.loading = false;
    }
  };

  const renderResultTrack = (card, tracks) => {
    import('../components/track-list.js').then(() => {
      const trackListElement = document.createElement('track-list');
      trackListElement.card = card;
      trackListElement.tracks = tracks;
      mainContentElement.content = trackListElement;
    });
  };

  const renderResultCard = (type, cards) => {
    import('../components/card-list.js').then(() => {
      const cardListElement = document.createElement('card-list');
      cardListElement.type = type;
      cardListElement.cards = cards;
      cardListElement.itemClickEvent = onCardItemClick;
      mainContentElement.content = cardListElement;
    });
  };

  const createSearchList = (type, data) => {
    const searchListElement = document.createElement('search-list');
    searchListElement.type = type;
    searchListElement.results = data;
    searchListElement.seeAllEvent = onSeeAllClick;
    searchListElement.itemClickEvent = onCardItemClick;

    return searchListElement;
  };

  const renderResultSearch = (searchData) => {
    import('../components/search-list.js').then(() => {
      const searchListContainer = document.createElement('div');

      const searchListAlbums = createSearchList('albums', searchData.albums);
      const searchListArtists = createSearchList('artists', searchData.artists);
      const searchListPlaylsits = createSearchList('playlists', searchData.playlists);

      searchListContainer.appendChild(searchListAlbums);
      searchListContainer.appendChild(searchListArtists);
      searchListContainer.appendChild(searchListPlaylsits);

      mainContentElement.content = searchListContainer;
    });
  };

  const fallbackResult = (error) => {
    console.error(error);
    mainContentElement.renderError(error);
  };

  // start resopnsive navbar
  const onShowMobileMenu = () => {
    navElement.classList.remove('hidden');
    navElement.classList.remove('sm:flex');
    navElement.classList.add('flex');
    navElement.classList.add('z-20');

    overlayElement.classList.remove('opacity-0');
    overlayElement.classList.remove('-z-1');
    overlayElement.classList.add('opacity-100');
    overlayElement.classList.add('z-10');
  };

  const onCloseMobileMenu = () => {
    navElement.classList.add('hidden');
    navElement.classList.add('sm:flex');
    navElement.classList.remove('flex');
    navElement.classList.remove('z-20');

    overlayElement.classList.add('opacity-0');
    overlayElement.classList.add('-z-1');
    overlayElement.classList.remove('opacity-100');
    overlayElement.classList.remove('z-10');
  };

  overlayElement.addEventListener('click', onCloseMobileMenu);
  appBarElement.mobileMenuEvent = onShowMobileMenu;
  // end resopnsive navbar

  menuItemElements.forEach((menuItemElement) => {
    menuItemElement.clickEvent = onMenuClick;
  });

  appBarElement.searchEvent = onSearchChange;
};

export default main;
