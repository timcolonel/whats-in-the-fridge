class SearchRecipesController < ApplicationController

  # Search recipes by ingredients
  # The recipe must have all the ingredients given
  def search_by_ingredients
    ingredient_ids = params[:ingredients].split(',').map { |x| x.to_i }
    inputed_ingredients = keep_leaf_ingredients_only(ingredient_ids)
    recipes = find_recipes_matching(inputed_ingredients)
    render json: recipes.as_json
  end

  private

  def find_recipes_matching(ingredients)
    all_ingredients = get_all_ingredients_ids(ingredients)
    Recipe.joins(:recipe_ingredients)
        .where(recipe_ingredients: {ingredient_id: all_ingredients})
        .group('recipes.id').having('count(*) >= ?', ingredients.size).limit(20)
  end

  def keep_leaf_ingredients_only(ids)
    all_ingredients = Ingredient.where(id: ids)
    ingredients = []
    all_ingredients.each do |ingredient|
      skip = false
      all_ingredients.each do |other|
        if other != ingredient
          if other.is_child_of? ingredient
            skip = true
          end
        end
      end

      unless skip
        ingredients << ingredient
      end
    end
    ingredients
  end

  def get_all_ingredients_ids(ingredients)
    ids = if ingredients.is_a? Array
            ingredients.map(&:id)
          else

            ingredients.ids
          end
    ingredients.each do |ingredient|
      ids += get_all_ingredients_ids(ingredient.children)
    end
    ids
  end
end
