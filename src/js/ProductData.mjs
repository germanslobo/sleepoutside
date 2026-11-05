const baseURL = '../json/';

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw new Error({ name: 'servicesError', message: jsonResponse });
  }
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
  }

  async getData() {
    const response = await fetch(`${baseURL}${this.category}.json`);
    const data = await convertToJson(response);
    return data;
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}