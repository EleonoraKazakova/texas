import "../../styles/admin.sass";
import EmptyImg from "../../images/empty.jpg";

export default function AdminFormCategory({
  itemData,
  descriptionData,
  fileData,
  onUpdate,
}) {
  const [title, setTitle] = itemData;
  const [description, setDescription] = descriptionData;
  const [file, setFile] = fileData;

  return (
    <div className="admin-form">
      <h3 className="admin-title">Add category</h3>
      <form onSubmit={onUpdate} className="admin-form">
        <div>
          <label>Title</label>
          <input
            placeholder="Title"
            required
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            placeholder="description"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="admin-label">
          <label className="admin-choose-image">Choose picture</label>
          <img
            src={file !== null ? URL.createObjectURL(file) : EmptyImg}
            className="admin-foto"
          />
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(event) => setFile(event.target.files[0])}
          />
        </div>

        <button className="admin-button" onClick={() => setFile(null)}>
          Delete picture
        </button>
        <button className="admin-button">Add category</button>
      </form>
    </div>
  );
}
