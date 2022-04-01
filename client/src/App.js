import logo from "./logo.svg";
import "./App.css";
import { SwitchVerticalIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { Add, FindAll } from "./actions/images";
import Image from "./components/Image";
import { useForm } from "react-hook-form";
import classnames from "classnames";
function App() {
  const [show, setShow] = useState(false);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    FindAll(setImages);
  }, []);

  /* onsubmit */
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("image", data.image[0]);

    Add(formData, setImages, setErrors);
  };
  return (
    <div className="App container p-4">
      <div className="form__index">
        <div>
          <button
            className="btn btn-outline-primary sm"
            onClick={() => setShow(!show)}
          >
            <SwitchVerticalIcon style={{ width: "20px" }} />
          </button>
        </div>
        {show ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="text"
                {...register("title")}
                className={classnames("form-control mt-4", {
                  "is-invalid": errors.title,
                })}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="file"
                {...register("image")}
                className={classnames("form-control mt-4", {
                  "is-invalid": errors.image,
                })}
              />
              {errors.image && (
                <div className="invalid-feedback">{errors.image}</div>
              )}
            </div>
            <button className="btn btn-outline-primary sm mt-4">Save</button>
          </form>
        ) : (
          ""
        )}
      </div>
      <div className="gallery__index">
        <div className="row">
          {images.map(({ _id, title, image, path }) => (
            <Image id={_id} title={title} image={image} path={path} setImages={setImages}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
