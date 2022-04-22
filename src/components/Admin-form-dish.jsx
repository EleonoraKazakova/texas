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
    <form onSubmit={onCreate}>
      <div>
        {" "}
        <label>Title</label>
        <input
          placeholder="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        {" "}
        <label>Description</label>
        <input
          placeholder="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <div>
        <label>Ingredients</label>
        <input
          placeholder="ingredients"
          value={ingredients}
          onChange={(event) => setIngredients(event.target.value)}
        />
      </div>
      <div>
        <label>Price</label>
        <input
          placeholder="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </div>
      <div>
        <label>Choose image</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(event) => setFile(event.target.files[0])}
        />
      </div>

      <button className="admin-button">Add dish</button>
    </form>
  );
}
