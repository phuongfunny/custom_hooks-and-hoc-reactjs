import routes from '~/routes';

const Home = () => {
  return (
    <main
      style={{
        padding: 20,
      }}
    >
      <ul
        style={{
          listStyle: 'none',
        }}
      >
        {routes.map(
          (route) =>
            route.title != null && (
              <li key={route.title}>
                <a href={route.path} target='_blank' rel='noreferrer'>
                  {route.title}
                </a>
              </li>
            ),
        )}
      </ul>
    </main>
  );
};

export default Home;
