import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EditRecipe = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instruction, setInstruction] = useState("");

    useEffect(() => {
        const url = `/api/v1/${params.id}/edit`;
        fetch(url)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then((response) => setRecipe(response))
          .catch(() => navigate("/recipes"));
      }, [params.id]);

    const stripHtmlEntities = (str) => {
        return String(str)
            .replace(/\n/g, "<br> <br>")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&glt;");
    };
    const onChange = (event, setFunction) => {
        setFunction(event.target.value);
    };
    const onSubmit = (event) => {
        event.preventDefault();
        const url = "/api/v1/recipes/:id";

        if (name.length == 0 || ingredients.length == 0 || instruction.length == 0)
        return;
        const body = {
            name,
            ingredients,
            instruction: stripHtmlEntities(instruction),
        };
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "PATCH",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not okay.");
        })
        .then((response) => navigate(`/recipe/${response.id}`))
        .catch((error) => console.log(error.message));
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-12 col-lg-6 offset-lg-3">
                    <h1 className="font-weight-normal mb-5">
                        Update Recipe
                    </h1>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="recipeName">Recipe name</label>
                            <input 
                                type="text"
                                name="name"
                                id="recipeName"
                                clasName="form-control"
                                required
                                onChange={(event => onChange(event, setName))}
                                value={`${recipe.name}`}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="recipeIngredients">Ingredients</label>
                            <input
                                type="text"
                                name="ingredients"
                                id="recipeIngredients"
                                className="form-control"
                                required
                                onChange={(event) => onChange(event, setIngredients)}
                                value={`${recipe.ingredients}`}
                            />
                            <small id="ingredientsHelp" className="form-text text-muted">
                                Separate each ingredient with a comma.
                            </small>
                        </div>
                        <label htmlFor="instruction">Preparation Instructions</label>
                        <textarea
                        className="form-control"
                        id="instruction"
                        name="instruction"
                        rows="5"
                        required
                        onChange={(event) => onChange(event, setInstruction)}
                        value={`${recipe.instruction}`}
                        />
                        <button type="submit" className="btn custom-button mt-3">
                            Update Recipe
                        </button>
                        <Link to="/recipes" className="btn btn-link mt-3">
                            Back to recipes
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default EditRecipe