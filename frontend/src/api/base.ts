import axios, { AxiosInstance } from "axios";
import { csrfToken } from "./helpers/server-context";

class BaseAPI {
  private readonly client: AxiosInstance;

  constructor() {
    const headers = { Accept: "application/json", "X-CSRF-Token": csrfToken };
    const params = { format: "json" };

    this.client = axios.create({
      baseURL: "http://localhost:3000/v1",
      timeout: 20000,
      headers,
      params
    });
  }

  setAuthorizationToken(token: string) {
    this.getClient().defaults.headers.common[
      "Authorization"
    ] = `bearer ${token}`;
  }

  protected getClient(): AxiosInstance {
    return this.client;
  }
}

export default BaseAPI;