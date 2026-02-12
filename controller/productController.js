import { ProductModel } from "../models/postgres/productModel.js"


export class ProductController {
  static async getAll (req, res) {
    try {
      const products = await ProductModel.getAll()
      return res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}