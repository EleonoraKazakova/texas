import "../styles/admin.sass";

export default function AdminFormDish({ formProps }) {
  const [
    title,
    setTitle,
    description,
    setDescription,
    ingredients,
    setIngredients,
    setFile,
    onCreate,
    price,
    setPrice,
  ] = formProps;
  return (
    <div className="admin-form">
      <h3 className="admin-title">Add dish</h3>
      <form onSubmit={onCreate} className="admin-form">
        <div>
          <label>Title</label>
          <input
            placeholder="title"
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
          <label>Choose image</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={(event) => setFile(event.target.files[0])}
          />
        </div>

        <button className="admin-button">Add dish</button>
      </form>
    </div>
  );
}
