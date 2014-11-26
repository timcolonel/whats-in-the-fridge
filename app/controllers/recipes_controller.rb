class RecipesController < ApplicationController
  load_and_authorize_resource

  def list
    @recipes.where('name like %?%', params[:q]).limit(20)
    render json: @recipes.as_json
  end

  def index

  end

  def show

  end

  def new
    @recipe.user_id = current_user.id
  end

  def create
    if @recipe.save
      load_ingredients
      redirect_to recipe_path(@recipe)
    else
      render :new
    end
  end

  def edit

  end

  def update
    @recipe.assign_attributes(recipe_params)
    if @recipe.save
      load_ingredients
      redirect_to recipe_path(@recipe)
    else
      load_ingredients
      render :edit
    end
  end

  def destroy
    @recipe.destroy
    redirect_to recipes_path
  end

  private

  def recipe_params
    params.require(:recipe).permit(:name, :cooking_time, :preparation_time, :preparation,
                                   :type_id, :user_id, :image, :cost, :complexity)
  end

  def load_ingredients
    if @recipe.valid?
      old_ingredients = @recipe.recipe_ingredients
      @recipe.recipe_ingredients.destroy_all
      return if params[:ingredients].nil?
      JSON.parse(params[:ingredients], symbolize_names: true).each do |x|
        recipe_ingredient = @recipe.recipe_ingredients.build
        recipe_ingredient.ingredient = Ingredient.find(x[:id].to_i)
        recipe_ingredient.value = x[:value]
      end
      @recipe.save
    end
  end


  def reset
    @recipe = Recipe.find(params[:id])
    @recipes = Recipe.all
  end
end
