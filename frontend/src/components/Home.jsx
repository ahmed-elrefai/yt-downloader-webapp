import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Preview = ({ link }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imgLink, setImgLink] = useState('');

  useEffect(() => {
    const getThumbnail = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/get-thumbnail/${link}`);
        setImgLink(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getThumbnail();
  }, [link]); // Dependency array includes link to rerun effect if link changes

  return (
    <>
      <div className="thumbnail-container">
        {isLoading ? <p>Loading...</p> : <img src={imgLink} alt="Thumbnail" />}
      </div>
      {/* <p>{title}</p> Add this line only if title is defined */}
    </>
  );
};

const Home = () => {
  const [isPreview, setIsPreview] = useState(false);
  const [link, setLink] = useState('');
  const inputRef = useRef(null);

  const handlePreviewClick = () => {
    setLink(inputRef.current.value);
    setIsPreview(true);
  };

  return (
    <>
      <div className="yt-banner">
        <img src="./src/assets/yt_EDITED.png" alt="" />
        <h2>YouTube Downloader</h2>
      </div>
      <div>
        <p>You can just place your video link below and click the download button</p>
        <input type="text" className="link-input" placeholder="Enter video link" ref={inputRef} />
        <button className="preview-button" onClick={handlePreviewClick}>Preview</button>
      </div>
      {isPreview && <Preview link={link} />}
    </>
  );
};

export default Home;
