import React, { useState } from "react";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div>
      <BackButton />
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center w-1/2 p-4 mx-auto border border-red-500">
          <p>Are you sure you want to delete this book?</p>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mt-4 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
