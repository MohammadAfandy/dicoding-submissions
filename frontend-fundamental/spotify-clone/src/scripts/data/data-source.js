import axios from 'axios';

const api = axios.create({
  // ini udah didisable corsnya ya (https://github.com/MohammadAfandy/spotify-clone-backend)
  // baseURL: 'https://spotify-clone-api.mohammadafandy.com/spotify',
  baseURL: 'http://localhost:3001/spotify',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    country: 'ID',
  },
});

class DataSource {
  static mapItem(item) {
    return {
      id: item.id,
      name: item.name,
      type: item.type,
      image: item.images && item.images[0] && item.images[0].url,
      description: item.description,
    };
  }

  static mapTrackItem(item) {
    return {
      id: item.id,
      name: item.name,
      artists: item.artists && item.artists.map((v) => v.name).join(', '),
      duration_ms: item.duration_ms,
    };
  }

  static async getPlaylists() {
    try {
      const response = await api.get('/browse/featured-playlists');
      const { items } = response.data.playlists;
      return items.map(this.mapItem);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getNewReleases() {
    try {
      const response = await api.get('/browse/new-releases');
      const { items } = response.data.albums;
      return items.map(this.mapItem);
    } catch (error) {
      throw new Error(error);
    }
  }

  static async search(keyword) {
    try {
      const params = {
        q: keyword,
        type: 'artist,album,playlist',
      };
      const response = await api.get('/search', {
        params,
      });

      const {
        artists = [],
        albums = [],
        playlists = [],
      } = response.data;

      return {
        artists: artists.items.map(this.mapItem),
        albums: albums.items.map(this.mapItem),
        playlists: playlists.items.map(this.mapItem),
      };

    } catch (error) {
      throw new Error(error);
    }
  }

  static async getTracks(id, type) {
    try {
      let params = 'tracks';
      if (type === 'artists') {
        params = 'top-tracks';
      }
      const response = await api.get(`/${type}/${id}/${params}`);

      let items = [];
      if (type === 'playlists') {
        items = response.data.items.map((v) => v.track);
      } else if (type === 'albums') {
        items = response.data.items;
      } else if (type === 'artists') {
        items = response.data.tracks;
      }

      return items.filter((v) => v != null).map(this.mapTrackItem);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default DataSource;
