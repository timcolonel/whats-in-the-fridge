class IngredientsController < ApplicationController
  load_and_authorize_resource

  def list
    @ingredients= @ingredients.where('name like ?', "%#{params[:q]}%").limit(20)
    render json: @ingredients.as_json
  end

  # Return a random ingredient
  def random
    offset = rand(@ingredients.count)
    render json: @ingredients.offset(offset).first.as_json
  end

  private
  def reset
    @ingredients = Ingredient.all
  end
end
