import axios from "axios";

const devAPIServer = "http://wheelofstandup-api-dev.azurewebsites.net";

export function getAllPeople() {
  return axios.get(devAPIServer + "/People");
}

export function addAPerson(userName) {
  return axios.post(devAPIServer + "/People", { name: userName });
}

export function deleteAPerson(userId) {
  return axios.delete(devAPIServer + "/People/" + userId);
}

export function enableAPerson(userId) {
  return axios.post(devAPIServer + "/People/" + userId + "/enable");
}

export function disableAPerson(userId) {
  return axios.post(devAPIServer + "/People/" + userId + "/disable");
}
