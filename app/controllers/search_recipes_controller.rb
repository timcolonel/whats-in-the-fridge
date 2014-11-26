class SearchRecipesController < ApplicationController

  # Search recipes by ingredients
  # The recipe must have all the ingredients given
  def search_by_ingredients
    ingredient_ids = params[:ingredients].split(',').map { |x| x.to_i }
    ingredients = get_all_ingredients_ids(Ingredient.where(id: ingredient_ids)
                                              .where('parent_id IS NULL OR parent_id not in (?)', ingredient_ids))
    puts 'In:'
    puts ingredients.to_a.to_s
    recipes = Recipe.joins(:recipe_ingredients)
                  .where(recipe_ingredients: {ingredient_id: ingredients})
                  .group('recipes.id').having('count(*) >= ?', ingredient_ids.size)
    render json: recipes.as_json
  end

  def get_all_ingredients_ids(ingredients)
    puts 'Starting:'
    puts ingredients.ids.to_s
    ids = ingredients.ids
    ingredients.each do |ingredient|
      puts ingredient.children.to_a.to_s
      ids += get_all_ingredients_ids(ingredient.children)
    end
    ids
  end
end
