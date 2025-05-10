import { useEffect, useRef, useState } from "react";
import IngredientsList from "./IngredientsList";
import ClaudeRecipe from "./ClaudeRecipe";
import { getRecipeFromMistral } from "../ai";

export function Form() {
    const [ingredients, setIngredients] = useState([]);

    function enterIngredients(formData) {
        const newIngredient = (formData.get("ingredient") || "").trim().toLowerCase();
        setIngredients((prev) => [...prev, newIngredient]);
    }

    const [recipe, setRecipe] = useState("")
    const recipeSection = useRef(null)
    useEffect(() => {
        if (recipe && recipeSection.current) {
            recipeSection.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [recipe]);

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    return (
        <main>
            <form action={enterIngredients} className="form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    );
}
