var RecipeSearcher = React.createClass({
    onChange: function (value) {
        window.location = Routes.recipe_path(value)
    },
    render: function () {
        return (
            <ReactSelectize selectId='search-recipes'
                url={Routes.list_recipes_path()}
                onChange={this.onChange}
                multiple={false}
                placeholder='Search for recipes...'/>
        );
    }
});


var RecipeSearcherByIngredient = React.createClass({
    getInitialState: function () {
        return {query: '', recipes: [], default_ingredient: undefined, default_recipes: []};
    },
    onChange: function (value) {
        this.loadFromServer(value);
    },
    loadFromServer: function (value) {
        this.setState({query: value});
        $.get(Routes.recipes_search_by_ingredients_path({ingredients: value})).done(function (data) {
            this.setState({recipes: data})
        }.bind(this));
    },
    loadDefaultRecipes: function (value) {
        $.get(Routes.random_ingredients_path()).done(function (ingredient) {
            console.log(ingredient.name);
            this.setState({default_ingredient: ingredient});
            $.get(Routes.recipes_search_by_ingredients_path({ingredients: ingredient.id})).done(function (data) {
                this.setState({default_recipes: data})
            }.bind(this));
        }.bind(this));
    },
    componentDidMount: function () {
        this.loadDefaultRecipes()
    },
    renderRecipes: function (recipes) {
        console.log(recipes.length);
        var recipes_splits = [[], [], []];
        eachSlice(recipes, 3, function (slice) {
            for (var i in slice) {

                recipes_splits[i].push(slice[i]);
            }
        });
        return recipes_splits.map(function (x) {
            return (
                <div className='col-md-4'>
                    {x}
                </div>
            )
        });
    },
    render: function () {
        var recipes = this.state.recipes.map(function (x) {
            return (
                <Recipe recipe={x}/>
            )
        });

        var default_recipes = this.state.default_recipes.map(function (x) {
            return (
                <Recipe recipe={x}/>
            )
        });

        if (recipes.length == 0) {
            if (this.state.query !== '') {
                recipes = (
                    <div>
                        <h4> No recipe match! </h4>
                    </div>
                )
            } else if (this.state.default_ingredient !== undefined && this.state.default_recipes.length > 0) {
                recipes = (
                    <div>
                        <div>
                            <h2>
                            Recipes with {this.state.default_ingredient.name}
                            </h2>
                        </div>
                        {this.renderRecipes(default_recipes)}
                    </div>
                )

            }
        } else {
            recipes = this.renderRecipes(recipes);
        }
        return (
            <div>
                <div>
                    <ReactSelectize selectId='search-recipes-by-ingredients' url={Routes.list_ingredients_path()}
                        onChange={this.onChange}
                        placeholder='Search a recipe with ingredients...'/>
                </div>
                <div className='recipe-list row'>
                {recipes}
                </div>
            </div>
        );
    }
});


var Recipe = React.createClass({
    render: function () {
        console.log(this.props.recipe);
        return (
            <a className='recipe' href={Routes.recipe_path(this.props.recipe.id)}>
                <div className='recipe-image'>
                    <img src={this.props.recipe.medium_image}/>
                </div>
                <div className='recipe-name'>
                        {this.props.recipe.name}
                </div>
            </a>
        );
    }
});