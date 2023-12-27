import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert("Some error occured");
      });
  }, []);

  const handleEdit = async (e) => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert("Some error occured");
      });
  };

  return (
    <div>
      <h1 className="text-xl m-4">Edit Book</h1>

      <BackButton />
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-blue-400 rounded-lg mx-auto p-4 w-1/2">
          <div className="my-4">
            <label className="mr-4 text-xl" htmlFor="bookTitle">
              Title{" "}
            </label>
            <input
              type="text"
              name="bookTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="bookTitle"
              className="border border-gray-500 rounded-md p-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="mr-4 text-xl" htmlFor="bookAuthor">
              Author{" "}
            </label>
            <input
              type="text"
              name="bookAuthor"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              id="bookAuthor"
              className="border border-gray-500 rounded-md p-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="mr-4 text-xl" htmlFor="bookPublishYear">
              Publish Year{" "}
            </label>
            <input
              type="text"
              name="bookPublishYear"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              id="bookPublishYear"
              className="border border-gray-500 rounded-md p-2 w-full"
            />
          </div>
          <div className="w-1/2 mx-auto">
            <button
              type="submit"
              className="bg-blue-300 p-2 rounded-md w-full"
              onClick={handleEdit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBook;
