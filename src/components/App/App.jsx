import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Container, GlobalStyle } from './GlobalStyles';

import { fetchImg } from '../ApiRequest';
import { SearchBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../button/Button';
import { Loader } from '../Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  const onSubmit = searchQuery => {
    if (searchQuery.trim() === '') {
      return;
    } else {
      setQuery(`${Date.now()}/${searchQuery}`);
      setPage(1);
      setGallery([]);
    }
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    const normQuery = query.split('/').pop();

    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError(false);

        const apiResponse = await fetchImg(normQuery, page);
        const newImages = apiResponse.hits;
        setTotalHits(apiResponse.totalHits);

        if (newImages.length === 0) {
          toast.error('Sorry, nothing was found on your request');
        } else {
          setGallery(prevGallery => [...prevGallery, ...newImages]);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [query, page]);

  return (
    <Container>
      <SearchBar onSubmit={onSubmit} />
      {error && <p>Oops! Something went wrong! Please try again</p>}
      {gallery.length > 0 && <ImageGallery images={gallery} />}
      {loading && <Loader />}
      {gallery.length > 0 && !loading && totalHits > gallery.length && (
        <Button onLoadMore={onLoadMore} />
      )}
      <GlobalStyle />
      <Toaster />
    </Container>
  );
};
