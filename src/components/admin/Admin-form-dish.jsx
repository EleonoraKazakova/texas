import "../../styles/admin.sass";
import EmptyImg from "../../images/empty.png";

export default function AdminFormDish({
  itemData,
  descriptionData,
  fileData,
  ingredientsData,
  priceData,
  onCreate,
}) {
  const [title, setTitle] = itemData;
  const [description, setDescription] = descriptionData;
  const [file, setFile] = fileData;
  const [ingredients, setIngredients] = ingredientsData;
  const [price, setPrice] = priceData;

  return (
    <div className="admin-form">
      <h3 className="admin-title">Add dish</h3>
      <form onSubmit={onCreate} className="admin-form">
        <div>
          <label>Title</label>
          <input
            placeholder="title"
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
        <div>
          <label>Ingredients</label>
          <input
            placeholder="ingredients"
            type="text"
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            placeholder="price"
            type="text"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <div className="admin-label">
          <button className="admin-button">Choose image</button>
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

        <button className="admin-button">Add dish</button>
      </form>
    </div>
  );
}
