Rails.application.routes.draw do
  get 'markdown/render' => 'markdown#process_markdown'

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users
  root 'welcome#index'

  get '/recipes/search/by_ingredients' => 'search_recipes#search_by_ingredients'

  resources :recipes do
    collection do
      get 'list'
    end
  end
  resources :ingredients do
    collection do
      get 'list'
      get 'random'
    end
  end


end
