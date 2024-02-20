import { useEffect, useState } from "react";
import axios from "axios";
import hostname from "../hostname";

function Test_image() {
  const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState(null);

  useEffect(() => {
    getImage();
  }, []);
  const submitImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post(
        `${hostname}/api/v1/epicerie/product/image/upload-image`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  };

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const getImage = async () => {
    const result = await axios.get(`${hostname}/api/v1/epicerie/product/image/get-image`,);
    console.log(result);
    setAllImage(result.data.data);
  };

  return (
    <div>
      <form onSubmit={submitImage}>
        <input type="file" accept="image/*" onChange={onInputChange}></input>
        <button type="submit">Submit</button>
      </form>
      {allImage == null
        ? ""
        : allImage.map((data) => {
            return (
              <img
                src={require(`../images/${data.image}`)}
                height={100}
                width={100}
                alt="test"
              />
            );
          })}
    </div>
  );
}
export default Test_image;