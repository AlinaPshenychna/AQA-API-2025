import { test, describe, expect, beforeEach } from "@jest/globals";
import { faker } from "@faker-js/faker";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import axios from "axios";
import CarsController from "../src/controllers/CarsController.js";
import AuthController from "../src/controllers/AuthController.js";
import { QAAUTO_API_URL } from "../src/constants/api.js";

describe("Cars API", () => {
  const jar = new CookieJar();
  const client = wrapper(
    axios.create({
      baseURL: QAAUTO_API_URL,
      validateStatus: () => true,
      jar,
    })
  );

  const authController = new AuthController(client);
  const carsController = new CarsController(client);
  beforeEach;
  const password = `Qwerty${faker.number.int({ min: 100, max: 999 })}`;
  const userData = {
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: password,
    repeatPassword: password,
  };
  test("sign up and log in", async () => {
    const signupResponse = await authController.signUp(userData);
    expect(signupResponse.status).toBe(201);

    const signinResponse = await authController.signIn({
      email: userData.email,
      password: userData.password,
      remember: false,
    });

    expect(signinResponse.status).toBe(200);
  });

  test("Get Brands", async () => {
    const getAllBrands = await carsController.getBrands();
    const brands = getAllBrands.data.data;

    expect(Array.isArray(brands)).toBe(true);
    expect(brands.length).toBeGreaterThan(0);

    brands.forEach((brand) => {
      expect(brand).toHaveProperty("id");
      expect(brand).toHaveProperty("title");
      expect(brand).toHaveProperty("logoFilename");
    });
  });

  test("Get Brands by ID", async () => {
    const brandsResponse = await carsController.getBrands();
    const brandId = brandsResponse.data.data[0].id;
    const brandTitle = brandsResponse.data.data[0].title;
    const brandLogoFilename = brandsResponse.data.data[0].logoFilename;

    const brandsById = await carsController.getBrandsByID(brandId);

    expect(brandsById.status).toBe(200);
    expect(brandsById.data.data.id).toBe(brandId);
    expect(brandsById.data.data.title).toBe(brandTitle);
    expect(brandsById.data.data.logoFilename).toBe(brandLogoFilename);
  });

  test("Get models", async () => {
    const carModels = await carsController.getModels();
        const models = carModels.data.data;

    expect(carModels.status).toBe(200);
    expect(Array.isArray(models)).toBe(true);
    expect(models.length).toBeGreaterThan(0);

   models.forEach((model) => {
      expect(model).toHaveProperty("id");
      expect(model).toHaveProperty("carBrandId");
      expect(model).toHaveProperty("title");
    });
  });

  test("Get models by ID", async () => {
    const brandsResponse = await carsController.getBrands();
    const brandId = brandsResponse.data.data[0].id;

    const modelsById = await carsController.getModelsByID(brandId);
    expect(modelsById.status).toBe(200);
    expect(modelsById.data.data.id).toBe(brandId);
  });

  test("Get cars", async () => {
    const cars = await carsController.getCars();
    expect(cars.status).toBe(200);
  });

  test("Post create new car", async () => {
    const brandsResponse = await carsController.getBrands();
    const brand = brandsResponse.data.data[0];

    const carModelResponse = await carsController.getModels();
    const model = carModelResponse.data.data.find(
      (model) => model.carBrandId === brand.id
    );
    const requestBody = {
      carBrandId: brand.id,
      carModelId: model.id,
      mileage: faker.number.int({ min: 1, max: 200_000 }),
    };
    const cars = await carsController.createCar(requestBody);
    expect(cars.status).toBe(201);
    expect(cars.data.status).toBe("ok");

    const createdCar = cars.data.data;
    const expectedData = {
      id: expect.any(Number),
      carBrandId: requestBody.carBrandId,
      carModelId: requestBody.carModelId,
      initialMileage: requestBody.mileage,
      carCreatedAt: expect.any(String),
      updatedMileageAt: expect.any(String),
      mileage: requestBody.mileage,
      brand: brand.title,
      model: model.title,
      logo: brand.logoFilename,
    };
    expect(createdCar).toEqual(expectedData);
  });

  test("Get cars ID", async () => {
    const brandsResponse = await carsController.getBrands();
    const brand = brandsResponse.data.data[0];

    const carModelResponse = await carsController.getModels();
    const model = carModelResponse.data.data.find(
      (model) => model.carBrandId === brand.id
    );
    const requestBody = {
      carBrandId: brand.id,
      carModelId: model.id,
      mileage: faker.number.int({ min: 1, max: 200_000 }),
    };
    const cars = await carsController.createCar(requestBody);
    expect(cars.status).toBe(201);
    expect(cars.data.status).toBe("ok");

    const createdCar = cars.data.data;
    const expectedData = {
      id: expect.any(Number),
      carBrandId: requestBody.carBrandId,
      carModelId: requestBody.carModelId,
      initialMileage: requestBody.mileage,
      carCreatedAt: expect.any(String),
      updatedMileageAt: expect.any(String),
      mileage: requestBody.mileage,
      brand: brand.title,
      model: model.title,
      logo: brand.logoFilename,
    };
    expect(createdCar).toEqual(expectedData);

    const carsById = await carsController.getCarById(createdCar.id);
    expect(carsById.data.data.id).toBe(createdCar.id);
    expect(carsById.status).toBe(200);
  });

  test("Update created car", async () => {
    const brandsResponse = await carsController.getBrands();
    const brand = brandsResponse.data.data[0];

    const carModelResponse = await carsController.getModels();
    const model = carModelResponse.data.data.find(
      (model) => model.carBrandId === brand.id
    );
    const requestBody = {
      carBrandId: brand.id,
      carModelId: model.id,
      mileage: faker.number.int({ min: 1, max: 200_000 }),
    };
    const cars = await carsController.createCar(requestBody);
    expect(cars.status).toBe(201);
    expect(cars.data.status).toBe("ok");

    const createdCar = cars.data.data;

    expect(createdCar).toMatchObject({
      carBrandId: requestBody.carBrandId,
      carModelId: requestBody.carModelId,
      mileage: requestBody.mileage,
      brand: brand.title,
      model: model.title,
    });

    const updateRequestBody = {
      carBrandId: brand.id,
      carModelId: model.id,
      mileage: faker.number.int({ min: 1, max: 200_000 }),
    };

    const updateCarResponse = await carsController.updateCarsByID(
      createdCar.id,
      updateRequestBody
    );
    expect(updateCarResponse.status).toBe(200);
    expect(updateCarResponse.data.status).toBe("ok");

    const updatedCar = updateCarResponse.data.data;
    expect(updatedCar.id).toBe(createdCar.id);
    expect(updatedCar.mileage).toBe(updateRequestBody.mileage);

    const getUpdatedCar = await carsController.getCarById(createdCar.id);
    expect(getUpdatedCar.status).toBe(200);
    expect(getUpdatedCar.data.data.mileage).toBe(updateRequestBody.mileage);
  });
  test("Delete created car", async () => {
    const brandsResponse = await carsController.getBrands();
    const brand = brandsResponse.data.data[0];

    const carModelResponse = await carsController.getModels();
    const model = carModelResponse.data.data.find(
      (model) => model.carBrandId === brand.id
    );
    const requestBody = {
      carBrandId: brand.id,
      carModelId: model.id,
      mileage: faker.number.int({ min: 1, max: 200_000 }),
    };
    const cars = await carsController.createCar(requestBody);
    expect(cars.status).toBe(201);
    expect(cars.data.status).toBe("ok");

    const createdCar = cars.data.data;

    expect(createdCar).toMatchObject({
      carBrandId: requestBody.carBrandId,
      carModelId: requestBody.carModelId,
      mileage: requestBody.mileage,
      brand: brand.title,
      model: model.title,
    });

    const createdCarById = await carsController.deleteCarsByID(createdCar.id);
    expect(createdCarById.data.status).toBe("ok");
    expect(createdCarById.status).toBe(200);

    const getDeletedCar = await carsController.getCarById(createdCar.id);
    expect(getDeletedCar.status).toBe(404);
  });
});
