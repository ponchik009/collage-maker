import axios from "axios";
import { io } from "socket.io-client";
import { Collage, CollageImage } from "../types";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 10000,
});

class Api {
  public async getByName(name: string) {
    return instance
      .get<Collage>(`/collage/${name}`)
      .then((response) => response.data);
  }

  public async addImage(position: number, image: File, collageName: string) {
    const formData = new FormData();

    formData.append("imagePosition", "" + position);
    formData.append("collageName", collageName);
    formData.append("file", image);

    return instance
      .post<Collage>(`/collage/addImage`, formData)
      .then((response) => response.data);
  }

  public async updateImage(id: string, x: number, y: number) {
    return instance
      .patch<CollageImage>(`/collage/updateImage/${id}`, { x, y })
      .then((response) => response.data);
  }
}

export const api = new Api();

export const socket = io(process.env.REACT_APP_SOCKET || "localhost:4001", {
  withCredentials: true,
  transports: ["websocket", "polling", "flashsocket"],
});
