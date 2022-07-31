import { useEffect, useState } from 'react';

import useIntersectionObserver from '~/hooks/useIntersectionObserver';

const UseIntersectionObserver = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [books, setBooks] = useState<string[]>([]);

  // Call API
  useEffect(() => {
    (async () => {
      setLoading(true);

      await fetch(`https://openlibrary.org/search.json?q=conan&page=${pageNumber}`)
        .then((res) => res.json())
        .then((data) =>
          setBooks((prevBooks) => [
            ...new Set([...prevBooks, ...data.docs.map((doc: any) => doc.title)]),
          ]),
        );

      setLoading(false);
    })();
  }, [pageNumber]);

  // USE IT HERE
  const { nodeRef, isIntersecting } = useIntersectionObserver({
    callback: () => setPageNumber((prevPageNumber) => prevPageNumber + 1),
    options: {
      rootMargin: '100px',
    },
  });

  return (
    <main style={{ padding: 40 }}>
      <div
        style={{
          position: 'fixed',
          top: 10,
          right: 10,
          backgroundColor: isIntersecting ? 'green' : 'transparent',
          color: isIntersecting ? 'white' : 'black',
        }}
      >
        In viewport: {JSON.stringify(isIntersecting)}
      </div>

      {books.map((book) => (
        <h3
          ref={nodeRef} // bind ref
          key={book}
        >
          {book}
        </h3>
      ))}

      {loading && (
        <div
          style={{
            fontSize: '2rem',
            color: 'red',
          }}
        >
          Loading...
        </div>
      )}
    </main>
  );
};

export default UseIntersectionObserver;
