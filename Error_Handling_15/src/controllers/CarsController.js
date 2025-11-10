import BaseController from "./BaseController.js";

export default class CarsController extends BaseController {
  getBrands() {
    return this.client.get("cars/brands");
  }
  getBrandsByID(id) {
    return this.client.get(`cars/brands/${id}`);
  }

  getModels() {
    return this.client.get("cars/models");
  }
  getModelsByID(id) {
    return this.client.get(`cars/models/${id}`);
  }
  getCars() {
    return this.client.get("cars");
  }

  createCar(carData) {
    return this.client.post("cars", carData);
  }

  getCarById(id) {
    return this.client.get(`cars/${id}`);
  }
  updateCarsByID(id, upadeteCarData) {
    return this.client.put(`cars/${id}`, upadeteCarData);
  }

  deleteCarsByID(id) {
    return this.client.delete(`cars/${id}`);
  }
}
