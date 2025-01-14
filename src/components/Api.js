import { token } from "../utils/constants.js";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  editUserInfo({ name, job }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
  }

  getData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]).then(
      ([userInfo, cards]) => {
        return { userInfo, cards };
      }
    );
  }

  addCard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  deleteCard({ cardId }) {
    return this._request(`${this._baseUrl}/cards/${cardId.slice(5)}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard({ cardId, method }) {
    return this._request(`${this._baseUrl}/cards/${cardId.slice(5)}/likes`, {
      method: method,
      headers: this._headers,
    });
  }

  editAvatarUrl({ url }) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: url }),
    });
  }
}

export const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});
