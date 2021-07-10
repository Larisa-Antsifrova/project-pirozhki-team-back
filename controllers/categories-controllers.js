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
