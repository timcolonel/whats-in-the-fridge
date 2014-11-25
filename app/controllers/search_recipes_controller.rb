class SearchRecipesController < ApplicationController

  # Search recipes by ingredients
  # The recipe must have all the ingredients given
  def search_by_ingredients
    ingredients = params[:ingredients].split(',').map { |x| x.to_i }
    recipes = Recipe.joins(:recipes_ingredients)
                  .where(recipes_ingredients: {ingredient_id: ingredients})
                  .group('recipes.id').having('count(*) >= ?', ingredients.size)
    recipes += recipes
    recipes += recipes
    recipes += recipes
    recipes += recipes
    render json: recipes.as_json
  end
end
