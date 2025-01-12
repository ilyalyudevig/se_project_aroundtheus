export class UserInfo {
  constructor({ nameSelector, jobSelector, profileImageSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._profileImage = document.querySelector(profileImageSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatarUrl: this._profileImage.src,
    };
  }

  setUserInfo({ name, job, avatarUrl }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    this._profileImage.src = avatarUrl;
  }

  setAvatar({ avatarUrl }) {
    this._profileImage.src = avatarUrl;
  }
}
