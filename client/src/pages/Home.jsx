import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiBookAdd } from "react-icons/bi";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="books/create">
          Add book
          <BiBookAdd className="text-blue-800 text-3xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="table-auto w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-gray-600">No.</th>
              <th className="border border-gray-600">Title</th>
              <th className="border border-gray-600">Author</th>
              <th className="border border-gray-600">Publish Year</th>
              <th className="border border-gray-600">Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id}>
                <td className="border border-gray-600 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-600 rounded-md text-center">
                  {book.title}
                </td>
                <td className="border border-gray-600 rounded-md text-center">
                  {book.author}
                </td>
                <td className="border border-gray-600 rounded-md text-center">
                  {book.publishYear}
                </td>
                <td className="border border-gray-600 rounded-md text-center">
                  <Link to={`/books/details/${book._id}`}>View</Link>
                  <Link to={`/books/edit/${book._id}`}>Edit</Link>
                  <Link to={`/books/delete/${book._id}`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
