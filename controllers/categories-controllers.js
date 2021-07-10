const HardCodedCategories = require("../helpers/categories");
const Categories = require("../repositories/categories-repository");
const HttpCodes = require("../helpers/http-codes");
const Statuses = require("../helpers/statuses");

class CategoriesControllers {
  getHardCodedCategories(req, res, next) {
    try {
      res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: { categories: HardCodedCategories },
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategories(req, res, next) {
    try {
      const { id } = req.user;

      const categories = await Categories.getAllCategories(id);

      return res.json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: { categories },
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req, res, next) {
    try {
      const ownerId = req.user.id;
      const categoryId = req.params.categoryId;

      const [category] = await Categories.getCategoryById(ownerId, categoryId);

      if (!category) {
        return res.status(HttpCodes.NOT_FOUND).json({
          status: Statuses.ERROR,
          code: HttpCodes.NOT_FOUND,
          message: "Category was not found.",
        });
      }

      return res.status(HttpCodes.OK).json({
        status: Statuses.SUCCESS,
        code: HttpCodes.OK,
        data: { category },
      });
    } catch (error) {
      next(error);
    }
  }

  async addCategory(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async updateCategoryById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async deleteCategoryById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoriesControllers();
