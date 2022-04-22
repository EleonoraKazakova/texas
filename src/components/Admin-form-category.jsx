import "../styles/admin.sass";

export default function AdminFormCategory({ formProps }) {
  const [title, setTitle, description, setDescription, setFile, onUpdate] =
    formProps;

  return (
    <div className="admin-form">
      <h3 className="admin-title">Add category</h3>
      <form onSubmit={onUpdate} className="admin-form">
        <div>
          <label>Title</label>
          <input
            placeholder="Title"
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
          <label>Choose picture</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(event) => setFile(event.target.files[0])}
          />
        </div>
        <button className="admin-button">Add category</button>
      </form>
    </div>
  );
}
