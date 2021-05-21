var recipes = require('../recipes.json');
var router = require('express').Router();

const Recipes = {
	getById: recipeId => {
	    let { ids } = recipeId;
	    const recipeList = recipes.filter(recipe => recipe.id == ids)
	    return recipeList[0].ingredients;
  	}
}

router.get('/shopping-list', (req, res) => {
    const arr = []
    const recipeId = recipes.forEach(recipe => {
      if (recipe.id == req.query.ids) {
        arr.push(recipe.id);
      }
    });

    if (arr[0] == req.query.ids) {
      if (req.query.ids) {
        return res.json(Recipes.getById(req.query));
      }
      else {
        res.status(400).end();
      } 
    }
    else {
      res.status(404).json({
          errorMessage: 'NOT_FOUND'
      });
    }
});

module.exports = router;


