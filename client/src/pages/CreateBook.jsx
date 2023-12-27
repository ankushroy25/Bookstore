import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:5000/books", data)
      .then(() => {
        setLoading(false);
        navigate("/");
        toast.success("Book created successfully");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert("Some error occured");
      });
  };

  return (
    <div>
      CreateBook
      <BackButton />
      {loading && <Spinner />}
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
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
