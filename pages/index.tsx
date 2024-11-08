import SearchBox from "./searchBox";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <i className="fa-solid fa-bag-shopping text-blue-500 text-6xl mr-4 mb-5"></i>
      <h1 className="text-4xl font-bold text-center text-gray-700 mb-5 mt-5">
        Bazar Online
      </h1>
      <SearchBox />
    </div>
  );
};

export default Home;
