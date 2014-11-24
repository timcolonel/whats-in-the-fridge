class RecipesController < ApplicationController
  load_and_authorize_resource

  def index

  end

  def show

  end

  def new
    @recipe.user_id = current_user.id
  end

  def create
    load_ingredients
    if @recipe.save
      redirect_to recipe_path(@recipe)
    else
      render :new
    end
  end

  def edit

  end

  def update

  end

  def destroy

  end

  private

  def recipe_params
    params.require(:recipe).permit(:name, :cooking_time, :preparation_time, :preparation, :type_id, :user_id)
  end

  def load_ingredients
    @recipe.ingredients.destroy_all
    return if params[:ingredients].nil?
    params[:ingredients].split(',').each do |x|
      @recipe.ingredients << Ingredient.find(x.to_i)
    end
  end

  def reset
    @recipe = Recipe.find(params[:id])
  end
end
