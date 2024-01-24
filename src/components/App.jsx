import { useState, useEffect } from 'react';
import css from './App.module.css';

import { Searchbar, ImageGallery, getFetch, Button, Modal, Loader } from '.';

export const App = () => {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [alt, setAlt] = useState('');
  const [load, setLoad] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const { hits } = await getFetch();
  //       setPosts(hits ? hits : []);
  //     } catch (error) {
  //       setError(error.massege);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!search) return;
      setLoading(true);
      try {
        const { hits, totalHits } = await getFetch(search, page);
        setPosts(prevPosts => (hits ? [...prevPosts, ...hits] : prevPosts));
        setLoad(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setError(error.massege);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search, page]);

  const submitValue = search => {
    setSearch(search);
    setPage(1);
    setPosts([]);
  };

  const loadMore = () => setPage(prevPage => prevPage + 1);

  const showModal = (largeImageURL, tags) => {
    setModalOpen(true);
    setLargeImage(largeImageURL);
    setAlt(tags);
  };

  const closeModal = () => setModalOpen(false);
  return (
    <>
      <div className={css.app}>
        <Searchbar onSubmit={submitValue} />
        {error && <p className={css.error}>{error}</p>}
        {loading ? (
          Loader()
        ) : (
          <ImageGallery posts={posts} showModal={showModal} />
        )}
        {load && !loading && search && (
          <Button title={'Load more'} onClick={loadMore} />
        )}
      </div>
      {modalOpen && (
        <Modal close={closeModal}>
          <img src={largeImage} alt={alt} />
        </Modal>
      )}
    </>
  );
};
